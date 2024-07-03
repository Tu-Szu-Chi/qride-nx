import { Module, Global } from '@nestjs/common';
import pool from './db.config';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE_POOL',
      useValue: pool,
    },
  ],
  exports: ['DATABASE_POOL'],
})
export class DatabaseModule {}