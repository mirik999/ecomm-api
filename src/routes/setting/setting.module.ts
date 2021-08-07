import { Module } from '@nestjs/common';
import { SettingResolver } from './setting.resolver';
import { SettingService } from './setting.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './setting.schema';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Setting.name,
        useFactory: async () => {
          const schema = SettingSchema;
          schema.plugin(await require('mongoose-unique-validator'), {
            message: 'must be unique'
          });
          return schema;
        }
      }
    ]),
    CategoryModule
  ],
  providers: [SettingResolver, SettingService],
  exports: [SettingService]
})
export class SettingModule {}
