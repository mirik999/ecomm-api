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
import { GetElementsInput } from '../global-inputs/get-elements.input';
import {
  GetByIdsInput,
  GetByIdsOutput,
} from '../global-inputs/get-by-ids.input';
import { ProductStatistic } from '../statistic/response/cpu.res';
import { UserRes } from '../user/response/user.res';
import { getUserRole } from '../utils/user.decorator';

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

  async getProducts(controls: GetElementsInput): Promise<ProductsRes> {
    const { offset, limit, keyword } = controls;
    try {
      const products = await this.productRepository.aggregate([
        {
          $match: {
            $or: [{ name: { $regex: keyword, $options: 'i' } }],
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

      return products[0];
    } catch (err) {
      throw new ConflictException(`Cant get products. [Error] => ${err.message}`);
    }
  }

  async createProduct(newProduct: CreateProductReq, user: Partial<UserRes>): Promise<ProductRes> {
    try {
      return this.productRepository.create({
        id: uuid(),
        articul: newProduct.articul,
        name: newProduct.name,
        images: newProduct.images,
        cover: newProduct.cover,
        color: newProduct.color,
        group: newProduct.group,
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
        best: newProduct.best,
        sale: newProduct.sale,
        freeDelivery: newProduct.freeDelivery,
        guarantee: newProduct.guarantee,
        isDisabled: newProduct.isDisabled,
        category: newProduct.category,
        comment: [],
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
    disabledProducts: GetByIdsInput,
    user: Partial<UserRes>
  ): Promise<GetByIdsOutput> {
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
    activateProducts: GetByIdsInput,
    user: Partial<UserRes>
  ): Promise<GetByIdsOutput> {
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
    deleteProducts: GetByIdsInput,
  ): Promise<GetByIdsOutput> {
    try {
      await this.productRepository.deleteMany(
        { id: { $in: deleteProducts.ids } }
      );
      return deleteProducts;
    } catch (err) {
      throw new ConflictException(`Cant delete products => ${err.message}`);
    }
  }

  async collectStatistics(): Promise<ProductStatistic> {
    try {
      const statistics = await this.productRepository.aggregate([
        {
          $group: {
            _id: '',
            count: {
              $sum: 1,
            },
            isDisabled: {
              $sum: { $cond: ['$isDisabled', 1, 0] },
            },
            price: {
              $sum: '$price',
            },
            sale: {
              $sum: { $cond: ['$sale', 1, 0] },
            },
            comment: {
              $sum: {
                $size: '$comment',
              },
            },
            sold: {
              $sum: '$sold',
            },
          },
        },
        {
          $project: {
            _id: 0,
            count: 1,
            isDisabled: 1,
            price: 1,
            sale: 1,
            comment: 1,
            sold: 1,
          },
        },
      ]);
      
      return statistics[0];
    } catch(err) {
      throw new ConflictException(`Cant collect product statistics => ${err.message}`);
    }
  }
}
