import { Pool } from 'pg';
import knex from 'knex';

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT, DB_HOST } = process.env

const pgConfig = {
    user: DB_USERNAME,
    host: DB_HOST,
    database: DB_NAME,
    password: DB_PASSWORD,
    port: +DB_PORT,
  }
const pool = new Pool(pgConfig);

export const db = knex({
    client: 'pg',
    connection: pgConfig,
    pool: {
      min: 2,
      max: 10
    }
  });
export default pool;