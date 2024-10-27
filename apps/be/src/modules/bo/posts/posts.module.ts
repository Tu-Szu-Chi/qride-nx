import { Module } from '@nestjs/common';
import { PostsService } from '$/modules/posts/posts.service';
import { PostsController } from './posts.controller';
import { PostRepository } from '../../posts/posts.repository';
import { UploadController } from '$/modules/upload/upload.controller';

@Module({
  controllers: [PostsController, UploadController],
  providers: [
    PostsService,
    PostRepository,
  ],
  exports: [PostsService],
})
export class PostsBoModule {}
