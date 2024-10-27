export enum PostCategoryEnum {
  NEWS = 'News',
  PROMO = 'Promo',
  EVENT = 'Event',
  MEDIA = 'Media',
}
export interface PostEntity {
  id: string;
  title: string;
  category: PostCategoryEnum;
  content: string;
  cover_image?: string;
  is_active: boolean;
  publish_start_date: Date;
  publish_end_date: Date;
  created_at: Date;
  updated_at: Date;
}


export interface ICreatePost extends Pick<PostEntity, 'title' | 'category' | 'content' | 'cover_image' | 'is_active' | 'publish_end_date' | 'publish_start_date'> {}
export interface IUpdatePost extends ICreatePost {}
