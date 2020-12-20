import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { UpdateCategoryDto } from './dto/update.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private categoryRepository: Model<CategoryDocument>
  ) {}

  async getCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({});
    if (categories.length) {
      return categories;
    } else {
      throw new NotFoundException('Categories not found');
    }
  }

  async createProduct(newCategory: UpdateCategoryDto): Promise<Category> {
    try {
      const category = new Category();
      category.id = uuid();
      category.name = newCategory.name;
      category.tabName = newCategory.tabName;
      return this.categoryRepository.create(category);
    } catch (err) {
      throw new ConflictException('Cant create a category');
    }
  }

  async getCategory(ids: string[]): Promise<Category[]> {
    return this.categoryRepository.find({
      id: {
        $in: ids
      }
    });
  }

}
