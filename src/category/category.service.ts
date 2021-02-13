import { ConflictException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CategoryRes, CategoriesRes } from './response/category.res';
import { UpdateCategoryReq } from './request/update.req';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { GetByIdsInput, GetByIdsOutput } from '../global-inputs/get-by-ids.input';
import { CreateCategoryReq } from './request/create.req';
import { CategoryStatistic } from '../statistic/response/cpu.res';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private categoryRepository: Model<CategoryDocument>,
  ) {}

  async getCategoryById(id: string): Promise<CategoryRes> {
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

  async getCategories(controls: GetElementsInput): Promise<CategoriesRes> {
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
    newCategory: CreateCategoryReq,
  ): Promise<CategoryRes> {
    try {
      const category = new Category();
      category.id = newCategory.id;
      category.name = newCategory.name;
      category.tabName = newCategory.tabName;
      category.createdAt = new Date();
      category.isDisabled = false;
      category.subCategories = newCategory.subCategories;
      return this.categoryRepository.create(category);
    } catch (err) {
      throw new ConflictException('Cant create a category');
    }
  }

  async updateCategory(
    updatedCategory: UpdateCategoryReq,
  ): Promise<CategoryRes> {
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
  ): Promise<CategoryRes> {
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
  ): Promise<CategoryRes> {
    try {
      return this.categoryRepository.updateMany(
        { id: { $in: activateCategories.ids } },
        { $set: { isDisabled: false } },
      );
    } catch (err) {
      throw new ConflictException('Cant activate categories');
    }
  }

  async deleteCategories(
    deleteCategories: GetByIdsInput,
  ): Promise<GetByIdsOutput> {
    try {
      await this.categoryRepository.deleteMany(
        { id: { $in: deleteCategories.ids } }
      );
      return deleteCategories;
    } catch (err) {
      throw new ConflictException('Cant delete categories');
    }
  }

  async getCategoriesByIds(ids: string[]): Promise<CategoryRes[]> {
    try {
      return this.categoryRepository.find({
        id: { $in: ids },
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  async collectStatistics(): Promise<CategoryStatistic> {
    const statistics = await this.categoryRepository.aggregate([
      {
        $group: {
          _id: '',
          count: {
            $sum: 1,
          },
          isDisabled: {
            $sum: { $cond: ['$isDisabled', 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          isDisabled: 1,
        },
      },
    ]);

    return statistics[0];
  }
}
