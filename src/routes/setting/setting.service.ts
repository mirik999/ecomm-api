import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingDocument } from './setting.schema';
import { SettingRes } from './response/setting.res';
import { CreateSettingReq } from './request/create.req';
import { UpdateSettingReq } from './request/update.req';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel('Setting')
    private settingRepository: Model<SettingDocument>
  ) {}

  async getSettingByName(name: string): Promise<SettingRes> {
    return this.settingRepository.findOne({ name });
  }

  async createSetting(newSetting: CreateSettingReq): Promise<SettingRes> {
    try {
      return this.settingRepository.create({
        id: newSetting.id,
        name: newSetting.name,
        description: newSetting.description,
        keywords: newSetting.keywords,
        title: newSetting.title
      });
    } catch(err) {
      throw new ConflictException(
        `Cant create a setting. [Error] => ${err.message}`,
      );
    }
  }

  async updateSetting(
    updatedSetting: UpdateSettingReq,
  ): Promise<SettingRes> {
    try {
      const setting = await this.settingRepository.findOne({
        name: updatedSetting.name,
      });
      for (const key in updatedSetting) {
        if (updatedSetting.hasOwnProperty(key)) {
          setting[key] = updatedSetting[key];
        }
      }
      return this.settingRepository.create(setting);
    } catch (err) {
      throw new ConflictException('Cant update setting');
    }
  }
}
