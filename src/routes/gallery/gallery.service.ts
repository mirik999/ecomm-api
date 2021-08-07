import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { GalleryDocument } from './gallery.schema';
import { GalleryRes, GalleriesRes } from './response/gallery.res';
import { GetReq } from '../../common/request/get.req';
import { CreateGalleryReq } from './request/create.req';
import { UpdateGalleryReq } from './request/update.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { UserRes } from '../user/response/user.res';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel('Gallery')
    private galleryRepository: Model<GalleryDocument>,
  ) {}

  async getGalleryById(id: string): Promise<GalleryRes> {
    const gallery = await this.galleryRepository.findOne({ id });
    if (gallery) {
      if (gallery.isDisabled) {
        throw new ConflictException('Gallery was disabled');
      } else {
        return gallery;
      }
    } else {
      return null;
    }
  }

  async getGalleries(controls: GetReq): Promise<GalleriesRes> {
    const { offset, limit, keyword, from, to } = controls;
    const galleries = await this.galleryRepository.aggregate([
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
    if (!galleries[0]) {
      return {
        count: 0,
        payload: [],
      };
    }
    return galleries[0];
  }

  async createGallery(
    user: Partial<UserRes>,
    newGallery: CreateGalleryReq,
  ): Promise<GalleryRes> {
    try {
      return this.galleryRepository.create({
        id: uuid(),
        name: newGallery.name,
        images: newGallery.images,
        keywords: newGallery.keywords,
        htmlTitle: newGallery.htmlTitle,
        description: newGallery.description,
        createdAt: new Date(),
        createdBy: user.email,
        modifiedBy: user.email,
        isDisabled: false,
      });
    } catch (err) {
      throw new ConflictException(
        `Cant create a gallery. [Error] => ${err.message}`,
      );
    }
  }

  async updateGallery(updatedGallery: UpdateGalleryReq): Promise<GalleryRes> {
    try {
      const gallery = await this.galleryRepository.findOne({
        id: updatedGallery.id,
      });
      for (const key in updatedGallery) {
        if (updatedGallery.hasOwnProperty(key)) {
          gallery[key] = updatedGallery[key];
        }
      }
      return this.galleryRepository.create(gallery);
    } catch (err) {
      throw new ConflictException('Cant update gallery');
    }
  }

  async disableGalleries(disabledGalleries: GetByIdsReq): Promise<GalleryRes> {
    try {
      return this.galleryRepository.updateMany(
        { id: { $in: disabledGalleries.ids } },
        { $set: { isDisabled: true } },
      );
    } catch (err) {
      throw new ConflictException('Cant disable galleries');
    }
  }

  async activateGalleries(activateGalleries: GetByIdsReq): Promise<GalleryRes> {
    try {
      return this.galleryRepository.updateMany(
        { id: { $in: activateGalleries.ids } },
        { $set: { isDisabled: false } },
      );
    } catch (err) {
      throw new ConflictException('Cant activate galleries');
    }
  }
}
