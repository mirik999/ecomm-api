import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create.dto';
import { UpdateProductDto } from './dto/update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private productRepository: Model<ProductDocument>
  ) {}

  async getProduct(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({id});
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

  async getProducts(): Promise<Product[]> {
    const products = await this.productRepository.find({
      isDisabled: false
    });
    if (products.length) {
      return products;
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  async createProduct(newProduct: CreateProductDto): Promise<Product> {
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
      throw new ConflictException(`Cant create a product. [Error] => ${err.message}`);
    }
  }

  async updateProduct(
    // user: JwtPayload,
    updatedProduct: UpdateProductDto,
  ): Promise<Product> {
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
      throw new ConflictException(`Cant update a product [Error] => ${err.message}`);
    }
  }
}
