import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BiographyService } from './biography.service';
import { BiographyRes, BiographiesRes } from './response/biography.res';
import { GetReq } from '../../common/request/get.req';
import { CreateBiographyReq } from './request/create.req';
import { User } from '../../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { UpdateBiographyReq } from './request/update.req';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';

@Resolver(() => BiographyRes)
export class BiographyResolver {
  constructor(private biographyService: BiographyService) {}

  @Query(() => BiographyRes)
  async getBiographyById(@Args('id') id: string) {
    return this.biographyService.getBiographyById(id);
  }

  @Query(() => BiographiesRes)
  getBiographies(@Args('controls') controls: GetReq) {
    return this.biographyService.getBiographies(controls);
  }

  @Mutation(() => BiographyRes)
  createBiography(
    @User() user: Partial<UserRes>,
    @Args('newBiography') newBiography: CreateBiographyReq,
  ) {
    return this.biographyService.createBiography(user, newBiography);
  }

  @Mutation(() => BiographyRes)
  updateBiography(
    @User() user: Partial<UserRes>,
    @Args('updatedBiography')
    updatedBiography: UpdateBiographyReq,
  ) {
    return this.biographyService.updateBiography(updatedBiography);
  }

  @Mutation(() => BiographyRes)
  disableBiographies(
    @User() user: Partial<UserRes>,
    @Args('disabledBiographies')
    disabledBiographies: GetByIdsReq,
  ) {
    return this.biographyService.disableBiographies(disabledBiographies);
  }

  @Mutation(() => BiographyRes)
  activateBiographies(
    @User() user: Partial<UserRes>,
    @Args('activateBiographies')
    activateBiographies: GetByIdsReq,
  ) {
    return this.biographyService.activateBiographies(activateBiographies);
  }

  @Mutation(() => GetByIdsRes)
  deleteBiographies(
    @User() user: Partial<UserRes>,
    @Args('deleteBiographies') deleteBiographies: GetByIdsReq,
  ) {
    return this.biographyService.deleteBiographies(deleteBiographies);
  }
}
