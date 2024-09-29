import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';

@Module({
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}