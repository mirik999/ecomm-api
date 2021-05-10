import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SliderDocument } from './slider.schema';
import { SliderRes, SlidersRes } from './response/slider.res';
import { GetReq } from '../../common/request/get.req';
import { CreateSliderReq } from './request/create.req';
import { UpdateSliderReq } from './request/update.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';

@Injectable()
export class SliderService {
  constructor(
    @InjectModel('Slider')
    private sliderRepository: Model<SliderDocument>
  ) {}

  async getSliderById(id: string): Promise<SliderRes> {
    const slider = await this.sliderRepository.findOne({ id });
    if (slider) {
      if (slider.isDisabled) {
        throw new ConflictException('Slider is disabled');
      } else {
        return slider;
      }
    } else {
      return null;
    }
  }

  async getSliders(controls: GetReq): Promise<SlidersRes> {
    const { offset, limit, keyword, from, to } = controls;
    const sliders = await this.sliderRepository.aggregate([
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
    if (!sliders[0]) {
      return {
        count: 0,
        payload: []
      }
    }
    return sliders[0];
  }

  async createSlider(newSlider: CreateSliderReq): Promise<SliderRes> {
    try {
      return this.sliderRepository.create({
        id: newSlider.id,
        name: newSlider.name,
        images: newSlider.images,
        fade: newSlider.fade,
        vertical: newSlider.vertical,
        createdAt: new Date(),
        isDisabled: false
      });
    } catch(err) {
      throw new ConflictException(
        `Cant create a slider. [Error] => ${err.message}`,
      );
    }
  }

  async updateSlider(
    updatedSlider: UpdateSliderReq,
  ): Promise<SliderRes> {
    try {
      const slider = await this.sliderRepository.findOne({
        id: updatedSlider.id,
      });
      for (const key in updatedSlider) {
        if (updatedSlider.hasOwnProperty(key)) {
          slider[key] = updatedSlider[key];
        }
      }
      return this.sliderRepository.create(slider);
    } catch (err) {
      throw new ConflictException('Cant update slider');
    }
  }

  async disableSliders(
    disabledSliders: GetByIdsReq,
  ): Promise<SliderRes> {
    try {
      return this.sliderRepository.updateMany(
        { id: { $in: disabledSliders.ids } },
        { $set: { isDisabled: true } },
      );
    } catch (err) {
      throw new ConflictException('Cant disable sliders');
    }
  }

  async activateSliders(
    activateSliders: GetByIdsReq,
  ): Promise<SliderRes> {
    try {
      return this.sliderRepository.updateMany(
        { id: { $in: activateSliders.ids } },
        { $set: { isDisabled: false } },
      );
    } catch (err) {
      throw new ConflictException('Cant activate sliders');
    }
  }
}
