import {
  IsString,
  IsBoolean,
  IsEnum,
  IsDate,
  IsOptional,
} from 'class-validator';
import { Category } from '../postEntity';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsEnum(Category)
  category: Category;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  cover_image?: string;

  @IsBoolean()
  is_active: boolean;

  @IsDate()
  publish_start_date: Date;

  @IsDate()
  publish_end_date: Date;
}
