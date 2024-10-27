import {
    IsString,
    IsBoolean,
    IsEnum,
    IsDate,
    IsOptional,
  } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { PostCategoryEnum, ICreatePost } from '@org/types'

  export class CreatePostDto implements ICreatePost {
    @IsString()
    title: string;
  
    @IsEnum(PostCategoryEnum)
    category: PostCategoryEnum;
  
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
  
  export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsEnum(PostCategoryEnum)
    @IsOptional()
    override category?: PostCategoryEnum;
  
    @IsString()
    @IsOptional()
    coverImage?: string;
  
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
  }