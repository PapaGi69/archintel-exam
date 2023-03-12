import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ['pending', 'published'], default: 'pending' },
});

export interface Article {
  title: string;
  date: Date;
  summary: string;
  content: string;
  status: string;
}
