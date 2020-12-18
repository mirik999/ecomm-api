import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Product, ProductDocument } from './product.schema';
import { UpdateProductDto } from './dto/update.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private productRepository: Model<ProductDocument>
  ) {}

  async getProduct(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id,
        isDisabled: false
      }
    });
    if (product) {
      if (product.name) {
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
      where: {
        isDisabled: false
      },
    });
    if (products.length) {
      return products;
    } else {
      throw new NotFoundException('Product not found');
    }
  }

  async createProduct(newProduct: UpdateProductDto): Promise<Product> {
    try {
      const product = new Product();
      product.id = uuid();
      product.categoryId = Types.ObjectId(newProduct.categoryId);
      product.name = newProduct.name;
      product.images = newProduct.images;
      product.cover = newProduct.cover;
      product.color = newProduct.color;
      product.price = newProduct.price;
      product.stars = newProduct.stars;
      product.viewCount = newProduct.viewCount;
      product.saleCount = newProduct.saleCount;
      product.wishlistCount = newProduct.wishlistCount;
      product.new = newProduct.new;
      product.best = newProduct.best;
      product.sale = newProduct.sale;
      product.isDisabled = newProduct.isDisabled;
      product.createdAt = newProduct.createdAt;
      product.description = newProduct.description;
      // return this.productRepository.save(product);
      return product;
    } catch (err) {
      throw new ConflictException('Cant create a product');
    }
  }
  //
  // async updateProduct(
  //   user: JwtPayload,
  //   updateProductCredentials: UpdateProductCredentials,
  // ): Promise<Product> {
  //   try {
  //     const product = await this.productRepository.findOne({
  //       email: user.email,
  //     });
  //     for (let key in updateProductCredentials) {
  //       product[key] = updateProductCredentials[key];
  //     }
  //     return this.productRepository.save(product);
  //   } catch (err) {
  //     throw new ConflictException('Cant update a product');
  //   }
  // }
  //
  // async disableProduct(user: JwtPayload): Promise<Product> {
  //   try {
  //     const product = await this.productRepository.findOne({ user: user.id });
  //     product.isDisabled = true;
  //     return this.productRepository.save(product);
  //   } catch (err) {
  //     throw new ConflictException('Cant disable a product');
  //   }
  // }
}
