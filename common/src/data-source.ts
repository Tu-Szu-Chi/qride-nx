import "dotenv/config";
import { DataSource } from "typeorm"
import * as path from 'path';


// console.log({
//   type: "postgres",
//   host: "localhost",
//   port: +(process?.env?.DB_PORT ?? 5432),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: false,
//   logging: true,
//   entities: [
//     // __dirname + '/*.entity{.ts,.js}',
//     path.join(__dirname, '..', '..', '..', 'apps/be/src', "/**/*.entity{.ts,.js}"),
//     path.join(__dirname, '..', '..', '..', 'apps/be/src/modules/user/entities/user.entity.ts')
//   ],
//   migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
//   subscribers: [],
// })
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: +(process?.env?.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [
    // __dirname + '/*.entity{.ts,.js}',
    path.join(__dirname, '..', '..', '..', 'apps/be/src', "/**/*.entity{.ts,.js}"),
    // path.join(__dirname, '..', '..', '..', 'apps/be/src/modules/user/entities/user.entity.ts')
  ],
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
  subscribers: [],
})