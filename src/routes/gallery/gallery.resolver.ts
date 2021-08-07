import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GalleryService } from './gallery.service';
import { GalleryRes, GalleriesRes } from './response/gallery.res';
import { GetReq } from '../../common/request/get.req';
import { User } from '../../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { CreateGalleryReq } from './request/create.req';
import { UpdateGalleryReq } from './request/update.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';

@Resolver(() => GalleryRes)
export class GalleryResolver {
  constructor(private galleryService: GalleryService) {}

  @Query(() => GalleryRes)
  async getGalleryById(@Args('id') id: string) {
    return this.galleryService.getGalleryById(id);
  }

  @Query(() => GalleriesRes)
  getGalleries(@Args('controls') controls: GetReq) {
    return this.galleryService.getGalleries(controls);
  }

  @Mutation(() => GalleryRes)
  createGallery(
    @User() user: Partial<UserRes>,
    @Args('newGallery') newGallery: CreateGalleryReq,
  ) {
    return this.galleryService.createGallery(user, newGallery);
  }

  @Mutation(() => GalleryRes)
  updateGallery(
    @User() user: Partial<UserRes>,
    @Args('updatedGallery')
    updatedGallery: UpdateGalleryReq,
  ) {
    return this.galleryService.updateGallery(updatedGallery);
  }

  @Mutation(() => GalleryRes)
  disableGalleries(
    @User() user: Partial<UserRes>,
    @Args('disabledGalleries')
    disabledGalleries: GetByIdsReq,
  ) {
    return this.galleryService.disableGalleries(disabledGalleries);
  }

  @Mutation(() => GalleryRes)
  activateGalleries(
    @User() user: Partial<UserRes>,
    @Args('activateGalleries')
    activateGalleries: GetByIdsReq,
  ) {
    return this.galleryService.activateGalleries(activateGalleries);
  }
}
