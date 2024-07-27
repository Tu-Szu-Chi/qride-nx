import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { OtpCreateDto, OtpEntity, OtpTypeEnum } from '@org/types';
import { KNEX_CONNECTION } from '../../database.module';
import { Knex } from 'knex';

@Injectable()
export class OtpRepository {
  constructor(
    private readonly pool: Pool,
    @Inject(KNEX_CONNECTION) private readonly knex: Knex
  ) {}

  async findOne(
    phone: string,
    code: string,
    type: OtpTypeEnum
  ): Promise<OtpEntity | null> {
    // !expired time?
    const query = {
      text: 'SELECT * FROM otp WHERE phone = $1 AND code = $2 AND type = $3 AND is_verified = false ORDER BY created_at DESC LIMIT 1',
      values: [phone, code, type],
    };
    const result: QueryResult<OtpEntity> = await this.pool.query(query);
    return result.rows[0] || null;
  }
  async create(otpCreateDto: OtpCreateDto): Promise<boolean> {
    await this.knex('otp').insert(otpCreateDto)
    return true;
  }
  async verify(id: number): Promise<boolean> {
    const effected = await this.knex('otp')
      .where({ id })
      .update({ is_verified: true })
    return effected > 0;
  }
}
