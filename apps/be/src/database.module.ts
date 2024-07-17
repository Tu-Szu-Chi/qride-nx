import { Module, Global } from '@nestjs/common';
import pool, {db} from './db.config';
import { Pool } from 'pg'

export const KNEX_CONNECTION = Symbol('KNEX_CONNECTION');

@Global()
@Module({
  providers: [
    {
      provide: Pool,
      useValue: pool,
    },
    {
      provide: KNEX_CONNECTION,
      useValue: db
    }
  ],
  exports: [Pool, KNEX_CONNECTION],
})
export class DatabaseModule {}