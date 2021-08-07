import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';
import { ArticleDocument } from './article.schema';
import { CreateArticleReq } from './request/create.req';
import { UpdateArticleReq } from './request/update.req';
import { ArticleRes, ArticlesRes } from './response/article.res';
import { GetReq } from '../../common/request/get.req';
import { GetByIdsReq } from '../../common/request/get-by-ids.req';
import { ArticleStatistic } from '../statistic/response/cpu.res';
import { UserRes } from '../user/response/user.res';
import { GetByIdsRes } from '../../common/response/get-by-ids.res';
import { DateRangeReq } from '../../common/request/date-range.req';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article')
    private articleRepository: Model<ArticleDocument>,
  ) {}

  async getArticle(id: string): Promise<ArticleRes> {
    const article = await this.articleRepository.findOne({ id });
    if (article) {
      if (article.isDisabled) {
        throw new ConflictException('Article was disabled');
      } else {
        return article;
      }
    } else {
      throw new NotFoundException('Article not found');
    }
  }

  async getArticles(controls: GetReq): Promise<ArticlesRes> {
    const { offset, limit, keyword, from, to } = controls;
    const articles = await this.articleRepository.aggregate([
      {
        $match: {
          $or: [{ title: { $regex: keyword, $options: 'i' } }],
          createdAt: {
            $gte: from || new Date(952273033000),
            $lte: to || new Date(),
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $facet: {
          stage1: [{ $group: { _id: null, count: { $sum: 1 } } }],
          stage2: [{ $skip: offset }, { $limit: limit }],
        },
      },
      {
        $unwind: '$stage1',
      },
      {
        $project: {
          count: '$stage1.count',
          payload: '$stage2',
        },
      },
    ]);

    if (!articles[0]) {
      return {
        count: 0,
        payload: [],
      };
    }
    return articles[0];
  }

  async getArticlesByCategoryId(id: string): Promise<ArticleRes[]> {
    try {
      return this.articleRepository.find({ category: id });
    } catch (err) {
      throw new ConflictException(
        `Cant get articles. [Error] => ${err.message}`,
      );
    }
  }

  async createArticle(
    user: Partial<UserRes>,
    newArticle: CreateArticleReq,
  ): Promise<ArticleRes> {
    try {
      return this.articleRepository.create({
        id: uuid(),
        cover: newArticle.cover,
        images: newArticle.images,
        author: newArticle.author,
        slug: '',
        title: newArticle.title,
        content: newArticle.content,
        htmlTitle: newArticle.htmlTitle,
        keywords: newArticle.keywords,
        description: newArticle.description,
        createdAt: newArticle.createdAt,
        createdBy: user.email,
        modifiedBy: newArticle.modifiedBy,
        isDisabled: newArticle.isDisabled,
      });
    } catch (err) {
      throw new ConflictException(
        `Cant create a article. [Error] => ${err.message}`,
      );
    }
  }

  async updateArticle(
    updatedArticle: UpdateArticleReq,
    user: Partial<UserRes>,
  ): Promise<ArticleRes> {
    try {
      const article = await this.articleRepository.findOne({
        id: updatedArticle.id,
      });
      for (const key in updatedArticle) {
        if (updatedArticle.hasOwnProperty(key)) {
          article[key] = updatedArticle[key];
        }
      }
      article.modifiedBy = user.email;
      return this.articleRepository.create(article);
    } catch (err) {
      throw new ConflictException(
        `Cant update a article [Error] => ${err.message}`,
      );
    }
  }

  async disableArticles(
    disabledArticles: GetByIdsReq,
    user: Partial<UserRes>,
  ): Promise<GetByIdsRes> {
    try {
      await this.articleRepository.updateMany(
        { id: { $in: disabledArticles.ids } },
        { $set: { isDisabled: true, modifiedBy: user.email } },
      );
      return disabledArticles;
    } catch (err) {
      throw new ConflictException(`Cant disable articles => ${err.message}`);
    }
  }

  async activateArticles(
    activateArticles: GetByIdsReq,
    user: Partial<UserRes>,
  ): Promise<GetByIdsRes> {
    try {
      await this.articleRepository.updateMany(
        { id: { $in: activateArticles.ids } },
        { $set: { isDisabled: false, modifiedBy: user.email } },
      );
      return activateArticles;
    } catch (err) {
      throw new ConflictException(`Cant activate articles => ${err.message}`);
    }
  }

  async deleteArticles(deleteArticles: GetByIdsReq): Promise<GetByIdsRes> {
    try {
      await this.articleRepository.deleteMany({
        id: { $in: deleteArticles.ids },
      });
      return deleteArticles;
    } catch (err) {
      throw new ConflictException(`Cant delete articles => ${err.message}`);
    }
  }

  async collectStatistics(dateRange: DateRangeReq): Promise<ArticleStatistic> {
    const { from, to } = dateRange;

    const statistics = await this.articleRepository.aggregate([
      {
        $match: {
          createdAt: {
            $gte: from || new Date(952273033000),
            $lte: to || new Date(),
          },
        },
      },
      {
        $group: {
          _id: '',
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
        },
      },
    ]);

    if (!statistics[0]) {
      return {
        count: 0,
      };
    }
    return statistics[0];
  }
}
