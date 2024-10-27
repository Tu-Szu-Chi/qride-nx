import { Moment } from 'moment';

export type Category = 'News' | 'Promo' | 'Event';

export interface Post {
  id: number;
  title: string;
  category: Category;
  content: string;
  coverImage: string;
  isActive: boolean;
  publishStartDate: string;
  publishEndDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface FormValues {
  title: string;
  category: Category;
  isActive: boolean;
  publishDateRange: [Moment, Moment];
}

export interface UploadImageResponse {
  imageUrl: string;
}

export interface GetPostsResponse {
  data: Post[];
  total: number;
}
