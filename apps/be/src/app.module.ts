import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database.module';
import { ProductModule } from './modules/product/product.module';
import { BoModule } from './modules/bo/bo.module';
import { PostsModule } from './modules/bo/posts/posts.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 使配置在整個應用中可用
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ProductModule,
    BoModule,
    PostsModule,
    RouterModule.register([
      {
        path: 'bo',
        module: PostsModule,
      },
    ]),
  ],
})
export class AppModule {}
