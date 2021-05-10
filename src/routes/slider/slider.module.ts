import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SliderService } from './slider.service';
import { SliderResolver } from './slider.resolver';
import { Slider, SliderSchema } from './slider.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Slider.name,
        useFactory: async () => {
          const schema = SliderSchema;
          schema.plugin(await require('mongoose-unique-validator'), {
            message: 'must be unique'
          });
          return schema;
        }
      }
    ])
  ],
  providers: [SliderResolver, SliderService],
  exports: [SliderService]
})
export class SliderModule {}
