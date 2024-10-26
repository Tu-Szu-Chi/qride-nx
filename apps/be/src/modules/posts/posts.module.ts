import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostRepository } from './posts.repository';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { UploadController } from '../upload/upload.controller';

@Module({
  controllers: [PostsController, UploadController],
  providers: [
    PostsService,
    PostRepository,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [PostsService],
})
export class PostsModule {}
