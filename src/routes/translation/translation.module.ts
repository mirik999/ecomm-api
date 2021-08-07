import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TranslationService } from './translation.service';
import { TranslationResolver } from './translation.resolver';
import { Translation, TranslationSchema } from './translation.schema';
import { IsKeyValueValidate } from '../../utils/iskeyvalue.validator';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Translation.name,
        useFactory: async () => {
          const schema = TranslationSchema;
          schema.plugin(await require('mongoose-unique-validator'), {
            message: 'must be unique',
          });
          return schema;
        },
      },
    ]),
  ],
  providers: [TranslationService, TranslationResolver, IsKeyValueValidate],
  exports: [TranslationService],
})
export class TranslationModule {}
