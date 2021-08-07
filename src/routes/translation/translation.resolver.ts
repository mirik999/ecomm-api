import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TranslationService } from './translation.service';
import { UpdateTranslationReq } from './request/update.req';
import { TranslationRes, TranslationsRes } from './response/translation.res';
import { User } from '../../utils/user.decorator';
import { GetReq } from '../../common/request/get.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { CreateTranslationReq } from './request/create.req';
import { UserRes } from '../user/response/user.res';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';

@Resolver(() => TranslationRes)
export class TranslationResolver {
  constructor(private translationService: TranslationService) {}

  @Query(() => TranslationRes)
  getTranslationById(@Args('id') id: string): Promise<TranslationRes> {
    return this.translationService.getTranslationById(id);
  }

  @Query(() => TranslationsRes)
  getCTranslations(@Args('controls') controls: GetReq) {
    return this.translationService.getTranslations(controls);
  }

  @Mutation(() => TranslationRes)
  createTranslation(
    @User() user: Partial<UserRes>,
    @Args('newTranslation')
    newTranslation: CreateTranslationReq,
  ) {
    return this.translationService.createTranslation(newTranslation);
  }

  @Mutation(() => TranslationRes)
  updateTranslation(
    @User() user: Partial<UserRes>,
    @Args('updatedTranslation')
    updatedTranslation: UpdateTranslationReq,
  ) {
    return this.translationService.updateTranslation(updatedTranslation);
  }

  @Mutation(() => GetByIdsRes)
  deleteTranslations(
    @User() user: Partial<UserRes>,
    @Args('deleteTranslations') deleteCTranslations: GetByIdsReq,
  ) {
    return this.translationService.deleteTranslations(deleteCTranslations);
  }
}
