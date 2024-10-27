import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsEnum, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Category } from '../postEntity';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsEnum(Category)
  @IsOptional()
  category?: Category;

  @IsString()
  @IsOptional()
  coverImage?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
