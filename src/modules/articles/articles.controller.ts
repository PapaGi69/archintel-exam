import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/article.class';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('/article')
  async createArticle(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.createArticle(createArticleDto);
  }

  // @Get('/articles?')
  // async findByDateRange(
  //   @Query('dateRange') dateRange: Date,
  //   @Query('endDate') endDate: Date,
  // ) {
  //   return await this.articlesService.getArticleByDate(dateRange, endDate);
  // }

  @Get('/articles?')
  async findByDateRange(
    @Query('dateRange') dateRange: Date,
    @Query('endDate') endDate: Date,
    @Query('Status') status: string,
  ) {
    if (dateRange && endDate) {
      return await this.articlesService.getArticleByDate(dateRange, endDate);
    }
    if (status) {
      return await this.articlesService.getArticleByStatus(status);
    } else {
      throw new BadRequestException(`Incomplete Request Parameters`);
    }
  }

  // @Get('/articles?')
  // async findByStatus(@Query('Status') status: string) {
  //   return await this.articlesService.getArticleByStatus(status);
  // }

  @Delete('/article/:id')
  async deleteArticle(@Param('id') id: string) {
    return await this.articlesService.deleteArticle(id);
  }
}
