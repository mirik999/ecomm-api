import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CategoryRes, CategoriesRes } from './response/category.res';
import { UpdateCategoryReq } from './request/update.req';
import { GetReq } from '../../common/request/get.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { CreateCategoryReq } from './request/create.req';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category')
    private categoryRepository: Model<CategoryDocument>,
  ) {}

  async getCategoryById(id: string): Promise<CategoryRes> {
    const category = await this.categoryRepository.findOne({ id });
    if (category) {
      if (category.isDisabled) {
        throw new ConflictException('Category is disabled');
      } else {
        return category;
      }
    } else {
      throw new NotFoundException('Category not found');
    }
  }

  async getCategories(controls: GetReq): Promise<CategoriesRes> {
    const { offset, limit, keyword, from, to } = controls;
    const categories = await this.categoryRepository.aggregate([
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
    if (!categories[0]) {
      return {
        count: 0,
        payload: []
      }
    }
    return categories[0];
  }

  async createCategory(
    newCategory: CreateCategoryReq,
  ): Promise<CategoryRes> {
    const isCategoryExist = await this.categoryRepository.findOne({ name: newCategory.name })
    if (isCategoryExist !== null) {
      throw new ConflictException({
        key: 'name',
        message: 'Category already exists'
      });
    }

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
    disabledCategories: GetByIdsReq,
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
    activateCategories: GetByIdsReq,
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
    deleteCategories: GetByIdsReq,
  ): Promise<GetByIdsRes> {
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
      const sortedCategories = [];
      const categories = await this.categoryRepository.find({
        $or: [ { id: { $in: ids } }, { "subCategories.id": { $in: ids } } ]
      });
      for (let i = 0; i < categories.length; i++) {
        if (ids.includes(categories[i].id)) {
          sortedCategories.push(categories[i])
        }
        const filtered = categories[i].subCategories.filter(scat => ids.includes(scat.id));
        for (let j = 0; j < filtered.length; j++) {
          sortedCategories.push(filtered[i])
        }
      }
      return sortedCategories;
    } catch (err) {
      console.log(err.message);
    }
  }
}
