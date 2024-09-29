import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductDto, ProductVO} from '@org/types';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async findByUser(userId: string): Promise<ProductVO[]> {
      const productEntities = await this.productRepository.findByUser(userId)
      return productEntities.map(e => ({ img: '', ...e }))
  }
  async create(userId: string, productDto: ProductDto): Promise<ProductVO> {
    const productEntity = await this.productRepository.create(userId, productDto)
    return { img: '', ...productEntity }
  }
}