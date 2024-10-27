import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Pool } from 'pg';
import { KNEX_CONNECTION } from '../../database.module';
import { Knex } from 'knex';
import { isEmpty } from 'lodash';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './postEntity';

@Injectable()
export class PostRepository {
  private readonly logger = new Logger(PostRepository.name);

  constructor(
    private readonly pool: Pool,
    @Inject(KNEX_CONNECTION) private readonly knex: Knex
  ) {}

  async findById(id: string): Promise<Post | null> {
    try {
      const [post] = await this.knex('posts').where({ id }).select('*');
      return post || null;
    } catch (error) {
      this.logger.error(
        `Error fetching post by ID: ${error.message}`,
        error.stack
      );
      throw error;
    }
  }

  async findAll(
    page: number,
    limit: number
  ): Promise<{ data: Post[]; total: number }> {
    const offset = (page - 1) * limit;
    try {
      const data = await this.knex('posts')
        .select('*')
        .offset(offset)
        .limit(limit);
      const [{ count }] = await this.knex('posts').count('id as count');
      return { data, total: parseInt(count as string, 10) };
    } catch (error) {
      this.logger.error(`Error fetching posts: ${error.message}`, error.stack);
      throw error;
    }
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const postToInsert = {
      ...createPostDto,
      created_at: new Date(),
      updated_at: new Date(),
    };
    if (isEmpty(postToInsert)) throw new BadRequestException('Empty payload');

    this.logger.debug(
      `Attempting to insert post: ${JSON.stringify(postToInsert)}`
    );

    try {
      const [post] = await this.knex('posts')
        .insert(postToInsert)
        .returning('*');
      this.logger.debug(`Successfully inserted post: ${JSON.stringify(post)}`);
      return post;
    } catch (error) {
      this.logger.error(`Error creating post: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const postToUpdate = {
      ...updatePostDto,
      updated_at: new Date(),
    };
    if (isEmpty(postToUpdate)) throw new BadRequestException('Empty payload');

    try {
      const [post] = await this.knex('posts')
        .where({ id })
        .update(postToUpdate)
        .returning('*');
      return post;
    } catch (error) {
      this.logger.error(`Error updating post: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(id: string): Promise<number> {
    try {
      return await this.knex('posts').where({ id }).delete();
    } catch (error) {
      this.logger.error(`Error deleting post: ${error.message}`, error.stack);
      throw error;
    }
  }
}
