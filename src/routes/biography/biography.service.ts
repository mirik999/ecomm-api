import { ConflictException, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BiographyDocument } from './biography.schema';
import { GetReq } from '../../common/request/get.req';
import { BiographyRes, BiographiesRes } from './response/biography.res';
import { CreateBiographyReq } from './request/create.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { UpdateBiographyReq } from './request/update.req';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';
import { UserRes } from '../user/response/user.res';

@Injectable()
export class BiographyService {
  constructor(
    @InjectModel('Biography')
    private biographyRepository: Model<BiographyDocument>,
  ) {}

  async getBiographyById(id: string): Promise<BiographyRes> {
    const biography = await this.biographyRepository.findOne({ id });
    if (biography) {
      if (biography.isDisabled) {
        throw new ConflictException('Biography was disabled');
      } else {
        return biography;
      }
    } else {
      return null;
    }
  }

  async getBiographies(controls: GetReq): Promise<BiographiesRes> {
    const { offset, limit, keyword, from, to } = controls;
    const biographies = await this.biographyRepository.aggregate([
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
    if (!biographies[0]) {
      return {
        count: 0,
        payload: [],
      };
    }
    return biographies[0];
  }

  async createBiography(
    user: Partial<UserRes>,
    newBiography: CreateBiographyReq,
  ): Promise<BiographyRes> {
    try {
      return this.biographyRepository.create({
        id: uuid(),
        name: newBiography.name,
        images: newBiography.images,
        content: newBiography.content,
        keywords: newBiography.keywords,
        htmlTitle: newBiography.htmlTitle,
        description: newBiography.description,
        createdAt: new Date(),
        createdBy: user.email,
        modifiedBy: user.email,
        isDisabled: false,
      });
    } catch (err) {
      throw new ConflictException(
        `Cant create a biography. [Error] => ${err.message}`,
      );
    }
  }

  async updateBiography(
    updatedBiography: UpdateBiographyReq,
  ): Promise<BiographyRes> {
    try {
      const biography = await this.biographyRepository.findOne({
        id: updatedBiography.id,
      });
      for (const key in updatedBiography) {
        if (updatedBiography.hasOwnProperty(key)) {
          biography[key] = updatedBiography[key];
        }
      }
      return this.biographyRepository.create(biography);
    } catch (err) {
      throw new ConflictException('Cant update biography');
    }
  }

  async disableBiographies(
    disabledBiographies: GetByIdsReq,
  ): Promise<BiographyRes> {
    try {
      return this.biographyRepository.updateMany(
        { id: { $in: disabledBiographies.ids } },
        { $set: { isDisabled: true } },
      );
    } catch (err) {
      throw new ConflictException('Cant disable biographies');
    }
  }

  async activateBiographies(
    activateBiographies: GetByIdsReq,
  ): Promise<BiographyRes> {
    try {
      return this.biographyRepository.updateMany(
        { id: { $in: activateBiographies.ids } },
        { $set: { isDisabled: false } },
      );
    } catch (err) {
      throw new ConflictException('Cant activate biographies');
    }
  }

  async deleteBiographies(
    deleteBiographies: GetByIdsReq,
  ): Promise<GetByIdsRes> {
    try {
      await this.biographyRepository.deleteMany({
        id: { $in: deleteBiographies.ids },
      });
      return deleteBiographies;
    } catch (err) {
      throw new ConflictException('Cant delete biographies');
    }
  }
}
