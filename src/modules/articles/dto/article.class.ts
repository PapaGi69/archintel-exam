import { IsDateString } from 'class-validator';

export class CreateArticleDto {
  title: string;
  @IsDateString()
  date: Date;
  summary: string;
  content: string;
  status: string;
}
