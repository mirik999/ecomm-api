import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { ArticleRes, ArticlesRes } from './response/article.res';
import { CreateArticleReq } from './request/create.req';
import { UpdateArticleReq } from './request/update.req';
import { GetReq } from '../../common/request/get.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { User } from '../../utils/user.decorator';
import { UserRes } from '../user/response/user.res';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';

@Resolver(() => ArticleRes)
export class ArticleResolver {
  constructor(private productService: ArticleService) {}

  @Query(() => ArticleRes)
  async getArticle(@Args('id') id: string) {
    return this.productService.getArticle(id);
  }

  @Query(() => ArticlesRes)
  getArticles(@Args('controls') controls: GetReq) {
    return this.productService.getArticles(controls);
  }

  @Query(() => [ArticleRes])
  getArticlesByCategoryId(@Args('id') id: string) {
    return this.productService.getArticlesByCategoryId(id);
  }

  @Mutation(() => ArticleRes)
  createArticle(
    @User() user: Partial<UserRes>,
    @Args('newArticle') newArticle: CreateArticleReq,
  ) {
    return this.productService.createArticle(user, newArticle);
  }

  @Mutation(() => ArticleRes)
  updateArticle(
    @User() user: Partial<UserRes>,
    @Args('updatedArticle') updatedArticle: UpdateArticleReq,
  ) {
    return this.productService.updateArticle(updatedArticle, user);
  }

  @Mutation(() => GetByIdsRes)
  disableArticles(
    @User() user: Partial<UserRes>,
    @Args('disabledArticles') disabledArticles: GetByIdsReq,
  ) {
    return this.productService.disableArticles(disabledArticles, user);
  }

  @Mutation(() => GetByIdsRes)
  activateArticles(
    @User() user: Partial<UserRes>,
    @Args('activateArticles') activateArticles: GetByIdsReq,
  ) {
    return this.productService.activateArticles(activateArticles, user);
  }

  @Mutation(() => GetByIdsRes)
  deleteArticles(
    @User() user: Partial<UserRes>,
    @Args('deleteArticles') deleteArticles: GetByIdsReq,
  ) {
    return this.productService.deleteArticles(deleteArticles);
  }
}
