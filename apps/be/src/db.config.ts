import { Pool } from 'pg';
import knex from 'knex';
import { parse } from 'pg-connection-string';

const isProd = process.env.NODE_ENV === 'production';

let pgConfig: any;

if (isProd && process.env.DATABASE_URL) {
  // 生產環境使用 DATABASE_URL
  pgConfig = parse(process.env.DATABASE_URL);
  pgConfig.ssl = { rejectUnauthorized: false }; // Heroku 需要這個設置
} else {
  // 開發環境使用單獨的環境變量
  pgConfig = {
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
  };
}

// 創建 pg Pool
const pool = new Pool(pgConfig);

// 創建 Knex 實例
export const db = knex({
  client: 'pg',
  connection: pgConfig,
  pool: {
    min: 2,
    max: 10,
  },
});

export default pool;