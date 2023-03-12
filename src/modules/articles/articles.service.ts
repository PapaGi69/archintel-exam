import { Article } from '../schemas/article.schema';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/article.class';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const TAG = '[ArticlesService]';

@Injectable()
export class ArticlesService {
  private readonly logger = new Logger(ArticlesService.name);

  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async createArticle(createArticleDto: CreateArticleDto): Promise<any> {
    const METHOD = '[createArticle]';
    this.logger.log(`${TAG} ${METHOD}`);

    const newArticle = new this.articleModel(createArticleDto);
    const result = await newArticle.save();

    return { id: result.id };
  }

  async getArticleByDate(dateRange: Date, endDate: Date): Promise<any> {
    const METHOD = '[getArticleByDate]';
    this.logger.log(`${TAG} ${METHOD}`);

    const article = await this.articleModel.find({
      date: { $gte: dateRange, $lte: endDate },
    });
    if (!article) {
      throw new NotFoundException(`Article within date range does not exists`);
    }
    return article;
  }

  async getArticleByStatus(status: string): Promise<any> {
    const METHOD = '[getArticleByStatus]';
    this.logger.log(`${TAG} ${METHOD}`);

    const article = await this.articleModel.find({ status: status });
    if (!article) {
      throw new NotFoundException(`Article does not exists`);
    }
    return article;
  }

  async deleteArticle(id: string): Promise<any> {
    const METHOD = '[deleteArticle]';
    this.logger.log(`${TAG} ${METHOD}`);

    const article = await this.articleModel.findById(id);
    if (!article) {
      throw new NotFoundException(`Article with id "${id}" does not exists`);
    }

    return this.articleModel.deleteOne({ _id: id });
  }
}
