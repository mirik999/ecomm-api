import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SliderService } from './slider.service';
import { SliderRes, SlidersRes } from './response/slider.res';
import { GetReq } from '../../common/request/get.req';
import { User } from '../../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { CreateSliderReq } from './request/create.req';
import { UpdateSliderReq } from './request/update.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';

@Resolver(() => SliderRes)
export class SliderResolver {
  constructor(
    private slidersService: SliderService
  ) {}

  @Query(() => SliderRes)
  async getSliderById(@Args('id') id: string) {
    return this.slidersService.getSliderById(id);
  }

  @Query(() => SlidersRes)
  getSliders(@Args('controls') controls: GetReq) {
    return this.slidersService.getSliders(controls);
  }

  @Mutation(() => SliderRes)
  createSlider(
    @User() user: Partial<UserRes>,
    @Args('newSlider') newSlider: CreateSliderReq
  ) {
    return this.slidersService.createSlider(newSlider)
  }

  @Mutation(() => SliderRes)
  updateSlider(
    @User() user: Partial<UserRes>,
    @Args('updatedSlider')
      updatedSlider: UpdateSliderReq,
  ) {
    return this.slidersService.updateSlider(updatedSlider);
  }

  @Mutation(() => SliderRes)
  disableSliders(
    @User() user: Partial<UserRes>,
    @Args('disabledSliders')
      disabledSliders: GetByIdsReq,
  ) {
    return this.slidersService.disableSliders(disabledSliders);
  }

  @Mutation(() => SliderRes)
  activateSliders(
    @User() user: Partial<UserRes>,
    @Args('activateSliders')
      activateSliders: GetByIdsReq,
  ) {
    return this.slidersService.activateSliders(activateSliders);
  }
}
