import { Module, Global } from '@nestjs/common';
import pool from './db.config';
import { Pool } from 'pg'

@Global()
@Module({
  providers: [
    {
      provide: Pool,
      useValue: pool,
    },
  ],
  exports: [Pool],
})
export class DatabaseModule {}