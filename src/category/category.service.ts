import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { JwtPayload } from '../utils/jwt.strategy';
import { CategorySelf, CategoryType } from './category.type';
import { UpdateCategoryInput } from './input/update.input';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { GetByIdsInput } from '../global-inputs/get-by-ids.input';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private categoryRepository: Model<CategoryDocument>,
  ) {}

  async getCategoryById(id: string): Promise<CategorySelf> {
    const category = await this.categoryRepository.findOne({
      id,
      isDisabled: false,
    });
    if (category) {
      return category;
    } else {
      throw new ConflictException('This category was disabled');
    }
  }

  async getCategories(controls: GetElementsInput): Promise<CategoryType> {
    const { offset, limit, keyword } = controls;
    const categories = await this.categoryRepository.aggregate([
      {
        $match: {
          $or: [
            { name: { $regex: keyword } },
            { tabName: { $regex: keyword } },
          ],
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
    return categories[0];
  }

  async createCategory(
    newCategory: UpdateCategoryInput,
    user: JwtPayload,
  ): Promise<CategorySelf> {
    console.log('user in cr ct', user);
    try {
      const category = new Category();
      category.id = uuid();
      category.name = newCategory.name;
      category.tabName = newCategory.tabName;
      category.createdAt = new Date();
      category.isDisabled = false;
      return this.categoryRepository.create(category);
    } catch (err) {
      throw new ConflictException('Cant create a category');
    }
  }

  async updateCategory(
    updatedCategory: UpdateCategoryInput,
  ): Promise<CategorySelf> {
    try {
      const category = await this.categoryRepository.findOne({
        id: updatedCategory.id,
      });
      for (const key in updatedCategory) {
        if (updatedCategory.hasOwnProperty(key)) {
          category[key] = updatedCategory[key];
        }
      }
      return this.categoryRepository.create(category);
    } catch (err) {
      throw new ConflictException('Cant update category');
    }
  }

  async disableCategories(
    disabledCategories: GetByIdsInput,
  ): Promise<CategorySelf> {
    try {
      return this.categoryRepository.updateMany(
        { id: { $in: disabledCategories.ids } },
        { $set: { isDisabled: true } },
      );
    } catch (err) {
      throw new ConflictException('Cant disable categories');
    }
  }

  async activateCategories(
    activateCategories: GetByIdsInput,
  ): Promise<CategorySelf> {
    try {
      return this.categoryRepository.updateMany(
        { id: { $in: activateCategories.ids } },
        { $set: { isDisabled: false } },
      );
    } catch (err) {
      throw new ConflictException('Cant activate categories');
    }
  }

  async getCategory(ids: string[]): Promise<CategorySelf[]> {
    try {
      const categories = await this.categoryRepository.find({
        id: { $in: ids },
      });
      console.log(categories);
      return categories;
    } catch (err) {
      console.log(err.message);
    }
  }
}
