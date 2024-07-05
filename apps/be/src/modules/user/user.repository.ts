import { Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { UserEntity } from '@org/types';

@Injectable()
export class UserRepository {
  constructor(private readonly pool: Pool) {}

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

  // async create(user: Partial<User>): Promise<User> {
  //   const query = {
  //     text: 'INSERT INTO users(phone, password, first_name, last_name) VALUES($1, $2, $3, $4) RETURNING *',
  //     values: [user.phone, user.password, user.first_name, user.last_name],
  //   };
  //   const { rows } = await this.pool.query(query);
  //   return rows[0];
  // }

}