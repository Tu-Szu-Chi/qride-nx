import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { UserDto, UserEntity, UserVO } from '@org/types';
import { KNEX_CONNECTION } from '../../database.module';
import { Knex } from 'knex';
import { omit } from 'lodash';
import { fromDate } from '@org/common';

@Injectable()
export class UserRepository {
  constructor(
    private readonly pool: Pool,
    @Inject(KNEX_CONNECTION) private readonly knex: Knex
  ) {}

  async findByPhone(phone: string): Promise<UserEntity | null> {
    const query = {
      text: 'SELECT * FROM users WHERE phone = $1 LIMIT 1',
      values: [phone],
    };
    const result: QueryResult<UserEntity> = await this.pool.query(query);
    return result.rows[0] || null;
  }
  async findById(id: string): Promise<UserEntity | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];

    try {
      const { rows } = await this.pool.query(query, values);
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  async create(userDto: UserDto): Promise<UserVO> {
    const userToInsert = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(userDto).filter(([_, v]) => v !== undefined)
    );

    const [obj] = await this.knex('users').insert(userToInsert).returning('id');

    const userEntity = await this.findById(obj.id);
    return {
      ...omit(userEntity, [
        'created_at',
        'updated_at',
        'is_delete',
        'password',
        'birthday'
      ]),
      birthday: userEntity.birthday ? fromDate(userEntity.birthday) : null
    };
  }
}
