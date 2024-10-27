import { PostEntity } from '@org/types';
import { Moment } from 'moment';

export type FormValues = Pick<PostEntity, 'title' | 'category' | 'isActive'> & {
  publishDateRange: [Moment, Moment];
}

export interface UploadImageResponse {
  imageUrl: string;
}

export interface GetPostsResponse {
  data: PostEntity[];
  total: number;
}
