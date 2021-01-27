import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { ProductDocument } from './product.schema';
import { CreateProductInput } from './input/create.input';
import { UpdateProductInput } from './input/update.input';
import { ProductType, ProductsType } from './product.type';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import {
  GetByIdsInput,
  GetByIdsOutput,
} from '../global-inputs/get-by-ids.input';
import { ProductStatistic } from '../statistic/response/cpu.res';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private productRepository: Model<ProductDocument>,
  ) {}

  async getProduct(id: string): Promise<ProductType> {
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

  async getProducts(controls: GetElementsInput): Promise<ProductsType> {
    try {
      const { offset, limit, keyword } = controls;
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
      console.log(err.message);
    }
  }

  async createProduct(newProduct: CreateProductInput): Promise<ProductType> {
    try {
      return this.productRepository.create({
        id: uuid(),
        name: newProduct.name,
        images: newProduct.images,
        cover: newProduct.cover,
        color: newProduct.color,
        group: newProduct.group,
        sold: newProduct.sold,
        description: newProduct.description,
        createdAt: newProduct.createdAt,
        stars: newProduct.stars,
        price: newProduct.price,
        viewCount: newProduct.viewCount,
        wishlistCount: newProduct.wishlistCount,
        saleCount: newProduct.saleCount,
        new: newProduct.new,
        best: newProduct.best,
        sale: newProduct.sale,
        isDisabled: newProduct.isDisabled,
        category: newProduct.category,
        comment: []
      });
    } catch (err) {
      throw new ConflictException(
        `Cant create a product. [Error] => ${err.message}`,
      );
    }
  }

  async updateProduct(
    updatedProduct: UpdateProductInput,
  ): Promise<ProductType> {
    try {
      const product = await this.productRepository.findOne({
        id: updatedProduct.id,
      });
      for (const key in updatedProduct) {
        if (updatedProduct.hasOwnProperty(key)) {
          product[key] = updatedProduct[key];
        }
      }
      return this.productRepository.create(product);
    } catch (err) {
      throw new ConflictException(
        `Cant update a product [Error] => ${err.message}`,
      );
    }
  }

  async disableProducts(
    disabledProducts: GetByIdsInput,
  ): Promise<GetByIdsOutput> {
    try {
      await this.productRepository.updateMany(
        { id: { $in: disabledProducts.ids } },
        { $set: { isDisabled: true } },
      );
      return disabledProducts;
    } catch (err) {
      throw new ConflictException('Cant disable products');
    }
  }

  async activateProducts(
    activateProducts: GetByIdsInput,
  ): Promise<GetByIdsOutput> {
    try {
      await this.productRepository.updateMany(
        { id: { $in: activateProducts.ids } },
        { $set: { isDisabled: false } },
      );
      return activateProducts;
    } catch (err) {
      throw new ConflictException('Cant activate products');
    }
  }

  async collectStatistics(): Promise<ProductStatistic> {
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
  }
}
