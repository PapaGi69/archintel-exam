import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './article.class';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
