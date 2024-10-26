import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Category } from '../interfaces/post.interface';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsEnum(Category)
  @IsOptional()
  category?: 'News' | 'Promo' | 'Event';

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
