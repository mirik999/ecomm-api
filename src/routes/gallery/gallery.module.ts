import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryService } from './gallery.service';
import { GalleryResolver } from './gallery.resolver';
import { Gallery, GallerySchema } from './gallery.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Gallery.name,
        useFactory: async () => {
          const schema = GallerySchema;
          schema.plugin(await require('mongoose-unique-validator'), {
            message: 'must be unique'
          });
          return schema;
        }
      }
    ])
  ],
  providers: [GalleryResolver, GalleryService],
  exports: [GalleryService]
})
export class GalleryModule {}
