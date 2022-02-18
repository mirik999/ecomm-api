import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { Translation, TranslationDocument } from './translation.schema';
import { TranslationRes, TranslationsRes } from './response/translation.res';
import { UpdateTranslationReq } from './request/update.req';
import { GetReq } from '../../common/request/get.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { CreateTranslationReq } from './request/create.req';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';

@Injectable()
export class TranslationService {
  constructor(
    @InjectModel('Translation')
    private translationRepository: Model<TranslationDocument>,
  ) {}

  async getTranslationById(id: string): Promise<TranslationRes[]> {
    const payload = await this.translationRepository.find();
    const translation = payload.map((pl) => {
      return {
        ...pl,
        translation: pl.translation[id],
      };
    });
    console.log(translation);
    if (translation) {
      return translation;
    } else {
      throw new NotFoundException('Translation not found');
    }
  }

  async getTranslations(controls: GetReq): Promise<TranslationsRes> {
    const { offset, limit, keyword } = controls;
    const categories = await this.translationRepository.aggregate([
      {
        $match: {
          $or: [{ keyword: { $regex: keyword, $options: 'i' } }],
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
        payload: [],
      };
    }
    return categories[0];
  }

  async getAllTranslationForUi(langCode: string) {
    const allTranslations = await this.translationRepository.find();
    return allTranslations.reduce((acc: any, cur: any) => {
      return Object.assign(acc, { [cur.keyword]: cur.translation[langCode.toUpperCase()] });
    }, {});
  }

  async createTranslation(
    newTranslation: CreateTranslationReq,
  ): Promise<TranslationRes> {
    const isTranslationExist = await this.translationRepository.findOne({
      keyword: newTranslation.keyword,
    });
    if (isTranslationExist !== null) {
      throw new ConflictException({
        key: 'keyword',
        message: 'Translation already exists',
      });
    }

    try {
      const translation = new Translation();
      translation.id = uuid();
      translation.keyword = newTranslation.keyword;
      translation.translation = newTranslation.translation;
      translation.createdAt = new Date();
      return this.translationRepository.create(translation);
    } catch (err) {
      throw new ConflictException('Cant create a translation');
    }
  }

  async updateTranslation(
    updatedTranslation: UpdateTranslationReq,
  ): Promise<TranslationRes> {
    try {
      const translation = await this.translationRepository.findOne({
        id: updatedTranslation.id,
      });
      for (const key in updatedTranslation) {
        if (updatedTranslation.hasOwnProperty(key)) {
          translation[key] = updatedTranslation[key];
        }
      }
      return this.translationRepository.create(translation);
    } catch (err) {
      throw new ConflictException('Cant update translation');
    }
  }

  async deleteTranslations(
    deleteTranslations: GetByIdsReq,
  ): Promise<GetByIdsRes> {
    try {
      await this.translationRepository.deleteMany({
        id: { $in: deleteTranslations.ids },
      });
      return deleteTranslations;
    } catch (err) {
      throw new ConflictException('Cant delete categories');
    }
  }
}
