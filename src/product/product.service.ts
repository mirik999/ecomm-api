import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Product, ProductDocument } from './product.schema';
import { CreateProductInput } from './input/create.input';
import { UpdateProductInput } from './input/update.input';
import { ProductSelf, ProductType } from './product.type';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { GetByIdsInput } from '../global-inputs/get-by-ids.input';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private productRepository: Model<ProductDocument>,
  ) {}

  async getProduct(id: string): Promise<ProductSelf> {
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

  async getProducts(controls: GetElementsInput): Promise<ProductType> {
    try {
      const { offset, limit, keyword } = controls;
      const products = await this.productRepository.aggregate([
        {
          $match: {
            $or: [{ name: { $regex: keyword } }],
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

  async createProduct(newProduct: CreateProductInput): Promise<ProductSelf> {
    try {
      return this.productRepository.create({
        id: uuid(),
        name: newProduct.name,
        images: newProduct.images,
        cover: newProduct.cover,
        color: newProduct.color,
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
      });
    } catch (err) {
      throw new ConflictException(
        `Cant create a product. [Error] => ${err.message}`,
      );
    }
  }

  async updateProduct(updatedProduct: UpdateProductInput): Promise<Product> {
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

  async disableProducts(disabledProducts: GetByIdsInput): Promise<ProductSelf> {
    try {
      return this.productRepository.updateMany(
        { id: { $in: disabledProducts.ids } },
        { $set: { isDisabled: true } },
      );
    } catch (err) {
      throw new ConflictException('Cant disable products');
    }
  }

  async activateProducts(
    activateProducts: GetByIdsInput,
  ): Promise<ProductSelf> {
    try {
      return this.productRepository.updateMany(
        { id: { $in: activateProducts.ids } },
        { $set: { isDisabled: false } },
      );
    } catch (err) {
      throw new ConflictException('Cant activate products');
    }
  }
}
