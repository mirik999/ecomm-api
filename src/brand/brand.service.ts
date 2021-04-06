import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BrandDocument } from './brand.schema';
import { GetElementsInput } from '../global-inputs/get-elements.input';
import { BrandRes, BrandsRes } from './response/brand.res';
import { CreateBrandReq } from './request/create.req';
import { GetByIdsInput, GetByIdsOutput } from '../global-inputs/get-by-ids.input';
import { UpdateBrandReq } from './request/update.req';
import { BrandStatistic } from '../statistic/response/cpu.res';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel('Brand')
    private brandRepository: Model<BrandDocument>
  ) {}

  async getBrandById(id: string): Promise<BrandRes> {
    const brand = await this.brandRepository.findOne({ id });
    if (brand) {
      if (brand.isDisabled) {
        throw new ConflictException('Brand is disabled');
      } else {
        return brand;
      }
    } else {
      throw new NotFoundException('Brand not found');
    }
  }

  async getBrandsByCategoryId(id: string): Promise<BrandRes[]> {
    try {
      return this.brandRepository.find({ category: id })
    } catch (err) {
      throw new ConflictException(`Cant get brands. [Error] => ${err.message}`);
    }
  }

  async getBrands(controls: GetElementsInput): Promise<BrandsRes> {
    const { keyword, limit, offset } = controls;
    try {
      const brands = await this.brandRepository.aggregate([
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

      return brands[0];
    } catch (err) {
      throw new ConflictException(`Cant get brands. [Error] => ${err.message}`);
    }
  }

  async createBrand(newBrand: CreateBrandReq): Promise<BrandRes> {
    try {
      return this.brandRepository.create({
        id: newBrand.id,
        name: newBrand.name,
        imageUrl: newBrand.imageUrl,
        createdAt: new Date(),
        isDisabled: false,
        category: newBrand.category
      });
    } catch(err) {
      throw new ConflictException(
        `Cant create a brand. [Error] => ${err.message}`,
      );
    }
  }

  async updateBrand(
    updatedBrand: UpdateBrandReq,
  ): Promise<BrandRes> {
    try {
      const brand = await this.brandRepository.findOne({
        id: updatedBrand.id,
      });
      for (const key in updatedBrand) {
        if (updatedBrand.hasOwnProperty(key)) {
          brand[key] = updatedBrand[key];
        }
      }
      return this.brandRepository.create(brand);
    } catch (err) {
      throw new ConflictException('Cant update brand');
    }
  }

  async disableBrands(
    disabledBrands: GetByIdsInput,
  ): Promise<BrandRes> {
    try {
      return this.brandRepository.updateMany(
        { id: { $in: disabledBrands.ids } },
        { $set: { isDisabled: true } },
      );
    } catch (err) {
      throw new ConflictException('Cant disable brands');
    }
  }

  async activateBrands(
    activateBrands: GetByIdsInput,
  ): Promise<BrandRes> {
    try {
      return this.brandRepository.updateMany(
        { id: { $in: activateBrands.ids } },
        { $set: { isDisabled: false } },
      );
    } catch (err) {
      throw new ConflictException('Cant activate brands');
    }
  }

  async deleteBrands(
    deleteBrands: GetByIdsInput,
  ): Promise<GetByIdsOutput> {
    try {
      await this.brandRepository.deleteMany(
        { id: { $in: deleteBrands.ids } }
      );
      return deleteBrands;
    } catch (err) {
      throw new ConflictException('Cant delete brands');
    }
  }

  async collectStatistics(): Promise<BrandStatistic> {
    try {
      const statistics = await this.brandRepository.aggregate([
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
    } catch(err) {
      throw new ConflictException(`Cant collect brand statistics => ${err.message}`);
    }
  }
}
