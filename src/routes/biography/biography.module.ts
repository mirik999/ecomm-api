import { Module } from '@nestjs/common';
import { BiographyResolver } from './biography.resolver';
import { BiographyService } from './biography.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Biography, BiographySchema } from './biography.schema';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Biography.name,
        useFactory: async () => {
          const schema = BiographySchema;
          schema.plugin(await require('mongoose-unique-validator'), {
            message: 'must be unique',
          });
          return schema;
        },
      },
    ]),
    CategoryModule,
  ],
  providers: [BiographyResolver, BiographyService],
  exports: [BiographyService],
})
export class BiographyModule {}
