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
