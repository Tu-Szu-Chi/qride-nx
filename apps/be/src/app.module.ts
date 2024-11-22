import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database.module';
import { ProductModule } from './modules/product/product.module';
import { BoAuthModule } from './modules/bo/auth/auth.module';
import { RouterModule } from '@nestjs/core';
import { PostsModule } from './modules/posts/posts.module';
import { PostsBoModule } from './modules/bo/posts/posts.module';

@Module({
  imports: [
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/public',
      },
      {
        rootPath: join(__dirname, '..', 'uploads'),
        serveRoot: '/uploads',
        serveStaticOptions: {
          index: false,
          redirect: false,
          cacheControl: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        },
      }
    ),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ProductModule,
    PostsModule,
    BoAuthModule,
    PostsBoModule,
    RouterModule.register([
      {
        path: 'bo',
        children: [
          {
            path: 'posts',
            module: PostsBoModule,
          },
          {
            path: 'auth',
            module: BoAuthModule,
          },
        ],
      },
    ]),
  ],
})
export class AppModule {}
