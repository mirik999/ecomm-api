import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { BrandDocument } from './brand.schema';
import { GetReq } from '../../common/request/get.req';
import { BrandRes, BrandsRes } from './response/brand.res';
import { CreateBrandReq } from './request/create.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { UpdateBrandReq } from './request/update.req';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';
import { UserRes } from '../user/response/user.res';

@Injectable()
export class BrandService {
  constructor(
    @InjectModel('Brand')
    private brandRepository: Model<BrandDocument>,
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
      return null;
    }
  }

  async getBrandsByCategoryId(id: string): Promise<BrandRes[]> {
    try {
      return await this.brandRepository.find({ category: id });
    } catch (err) {
      throw new ConflictException(`Cant get brands. [Error] => ${err.message}`);
    }
  }

  async getBrands(controls: GetReq): Promise<BrandsRes> {
    const { offset, limit, keyword, from, to } = controls;
    const brands = await this.brandRepository.aggregate([
      {
        $match: {
          $or: [{ name: { $regex: keyword, $options: 'i' } }],
          createdAt: {
            $gte: from || new Date(952273033000),
            $lte: to || new Date(),
          },
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
    if (!brands[0]) {
      return {
        count: 0,
        payload: [],
      };
    }
    return brands[0];
  }

  async createBrand(
    user: Partial<UserRes>,
    newBrand: CreateBrandReq,
  ): Promise<BrandRes> {
    try {
      return this.brandRepository.create({
        id: uuid(),
        name: newBrand.name,
        imageUrl: newBrand.imageUrl,
        category: newBrand.category,
        createdAt: newBrand.createdAt,
        createdBy: user.email,
        modifiedBy: newBrand.modifiedBy,
        isDisabled: newBrand.isDisabled,
      });
    } catch (err) {
      throw new ConflictException(
        `Cant create a brand. [Error] => ${err.message}`,
      );
    }
  }

  async updateBrand(updatedBrand: UpdateBrandReq): Promise<BrandRes> {
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

  async disableBrands(disabledBrands: GetByIdsReq): Promise<BrandRes> {
    try {
      return this.brandRepository.updateMany(
        { id: { $in: disabledBrands.ids } },
        { $set: { isDisabled: true } },
      );
    } catch (err) {
      throw new ConflictException('Cant disable brands');
    }
  }

  async activateBrands(activateBrands: GetByIdsReq): Promise<BrandRes> {
    try {
      return this.brandRepository.updateMany(
        { id: { $in: activateBrands.ids } },
        { $set: { isDisabled: false } },
      );
    } catch (err) {
      throw new ConflictException('Cant activate brands');
    }
  }

  async deleteBrands(deleteBrands: GetByIdsReq): Promise<GetByIdsRes> {
    try {
      await this.brandRepository.deleteMany({ id: { $in: deleteBrands.ids } });
      return deleteBrands;
    } catch (err) {
      throw new ConflictException('Cant delete brands');
    }
  }
}
