export enum Category {
  News = 'News',
  Promo = 'Promo',
  Event = 'Event',
}

export interface Post {
  id: string;
  title: string;
  category: 'News' | 'Promo' | 'Event';
  content: string;
  cover_image?: string;
  is_active: boolean;
  publish_start_date: Date;
  publish_end_date: Date;
  created_at: Date;
  updated_at: Date;
}
