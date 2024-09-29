import { Controller, UseGuards, Get, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserId } from '../../decorators/userId.decorator';
import { ProductService } from './product.service';
import { ProductDto } from '@org/types';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/list')
  async getInfo(@UserId() userId: string) {
    return this.productService.findByUser(userId);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/save')
  async updateInfo(@UserId() userId: string, @Body() payload: ProductDto) {
    return this.productService.create(userId, payload);
  }
}
