import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { ProductDocument } from './product.schema';
import { CreateProductReq } from './request/create.req';
import { UpdateProductReq } from './request/update.req';
import { ProductRes, ProductsRes } from './response/product.res';
import { GetReq } from '../../common/request/get.req';
import {
  GetByIdsReq
} from '../../common/request/get-by-ids.req';
import { ProductStatistic } from '../statistic/response/cpu.res';
import { UserRes } from '../user/response/user.res';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';
import { DateRangeReq } from '../../common/request/date-range.req';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private productRepository: Model<ProductDocument>,
  ) {}

  async getProduct(id: string): Promise<ProductRes> {
    const product = await this.productRepository.findOne({ id });
    if (product) {
      if (product.isDisabled) {
        throw new ConflictException('Product is disabled');
      } else {
        return product;
      }
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  async getProducts(controls: GetReq): Promise<ProductsRes> {
    const { offset, limit, keyword, from, to } = controls;
    const products = await this.productRepository.aggregate([
      {
        $match: {
          $or: [{ name: { $regex: keyword, $options: 'i' } }],
          createdAt: { $gte: from || new Date(952273033000), $lte: to || new Date() }
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
          stage2: [{ $skip: offset }, { $limit: limit }],
        },
      },
      {
        $unwind: '$stage1',
      },
      {
        $project: {
          count: '$stage1.count',
          payload: '$stage2',
        },
      },
    ]);

    if (!products[0]) {
      return {
        count: 0,
        payload: []
      }
    }
    return products[0];
  }

  async getProductsByCategoryId(id: string): Promise<ProductRes[]> {
    try {
      return this.productRepository.find({ category: id })
    } catch (err) {
      throw new ConflictException(`Cant get products. [Error] => ${err.message}`);
    }
  }

  async createProduct(newProduct: CreateProductReq, user: Partial<UserRes>): Promise<ProductRes> {
    try {
      return this.productRepository.create({
        id: uuid(),
        code: newProduct.code,
        name: newProduct.name,
        images: newProduct.images,
        cover: newProduct.cover,
        color: newProduct.color,
        sold: newProduct.sold,
        description: newProduct.description,
        createdAt: newProduct.createdAt,
        createdBy: user.email,
        modifiedBy: newProduct.modifiedBy,
        stars: newProduct.stars,
        price: newProduct.price,
        viewCount: newProduct.viewCount,
        wishlistCount: newProduct.wishlistCount,
        saleCount: newProduct.saleCount,
        new: newProduct.new,
        used: newProduct.used,
        hasCoupon: newProduct.hasCoupon,
        defective: newProduct.defective,
        sale: newProduct.sale,
        best: false,
        freeDelivery: newProduct.freeDelivery,
        guarantee: newProduct.guarantee,
        isDisabled: newProduct.isDisabled,
        category: newProduct.category,
        brand: newProduct.brand,
        coupon: newProduct.coupon
      });
    } catch (err) {
      throw new ConflictException(
        `Cant create a product. [Error] => ${err.message}`,
      );
    }
  }

  async updateProduct(updatedProduct: UpdateProductReq, user: Partial<UserRes>): Promise<ProductRes> {
    try {
      const product = await this.productRepository.findOne({
        id: updatedProduct.id,
      });
      for (const key in updatedProduct) {
        if (updatedProduct.hasOwnProperty(key)) {
          product[key] = updatedProduct[key];
        }
      }
      product.modifiedBy = user.email;
      return this.productRepository.create(product);
    } catch (err) {
      throw new ConflictException(
        `Cant update a product [Error] => ${err.message}`,
      );
    }
  }

  async disableProducts(
    disabledProducts: GetByIdsReq,
    user: Partial<UserRes>
  ): Promise<GetByIdsRes> {
    try {
      await this.productRepository.updateMany(
        { id: { $in: disabledProducts.ids } },
        { $set: { isDisabled: true, modifiedBy: user.email, } },
      );
      return disabledProducts;
    } catch (err) {
      throw new ConflictException(`Cant disable products => ${err.message}`);
    }
  }

  async activateProducts(
    activateProducts: GetByIdsReq,
    user: Partial<UserRes>
  ): Promise<GetByIdsRes> {
    try {
      await this.productRepository.updateMany(
        { id: { $in: activateProducts.ids } },
        { $set: { isDisabled: false, modifiedBy: user.email, } },
      );
      return activateProducts;
    } catch (err) {
      throw new ConflictException(`Cant activate products => ${err.message}`);
    }
  }

  async deleteProducts(
    deleteProducts: GetByIdsReq,
  ): Promise<GetByIdsRes> {
    try {
      await this.productRepository.deleteMany(
        { id: { $in: deleteProducts.ids } }
      );
      return deleteProducts;
    } catch (err) {
      throw new ConflictException(`Cant delete products => ${err.message}`);
    }
  }

  async collectStatistics(dateRange: DateRangeReq): Promise<ProductStatistic> {
    const { from, to } = dateRange;

    const statistics = await this.productRepository.aggregate([
      {
        $match: {
          createdAt: { $gte: from || new Date(952273033000), $lte: to || new Date() }
        }
      },
      {
        $group: {
          _id: '',
          count: {
            $sum: 1,
          },
          sale: {
            $sum: { $cond: ['$sale', 1, 0] },
          },
          new: {
            $sum: { $cond: ['$new', 1, 0] },
          },
          used: {
            $sum: { $cond: ['$used', 1, 0] },
          },
          defective: {
            $sum: { $cond: ['$defective', 1, 0] },
          }
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          sale: 1,
          new: 1,
          used: 1,
          defective: 1
        },
      },
    ]);

    if (!statistics[0]) {
      return {
        count: 0,
        sale: 0,
        new: 0,
        used: 0,
        defective: 0
      }
    }
    return statistics[0];
  }
}
