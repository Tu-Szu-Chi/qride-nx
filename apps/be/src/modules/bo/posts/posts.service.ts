import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from '@org/types';
import {  CreatePostDto, UpdatePostDto } from '$/types'
import { PostRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postRepository.create(createPostDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 10
  ): Promise<{ data: PostEntity[]; total: number; page: number; limit: number }> {
    const { data, total } = await this.postRepository.findAll(page, limit);
    return { data, total, page, limit };
  }

  async findOne(id: string): Promise<PostEntity> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return post;
  }
  async getActivePosts(): Promise<PostEntity[]> {
    return this.postRepository.getActiveList()
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<PostEntity> {
    return this.postRepository.update(id, updatePostDto);
  }

  async remove(id: string): Promise<void> {
    const deletedCount = await this.postRepository.remove(id);
    if (deletedCount === 0) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
  }
}
