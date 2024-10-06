import { Injectable } from '@nestjs/common';
import { ProductDto, ProductRemoveDto, ProductUpdateDto, ProductVO } from '@org/types';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findByUser(userId: string): Promise<ProductVO[]> {
    const productEntities = await this.productRepository.findByUser(userId);
    return productEntities.map((e) => ({ img: '', ...e }));
  }
  async create(userId: string, productDto: ProductDto): Promise<ProductVO> {
    const productEntity = await this.productRepository.create(
      userId,
      productDto
    );
    return { img: '', ...productEntity };
  }
  async update(userId: string, payload: ProductUpdateDto): Promise<ProductVO> {
    //!TODO: check user is product owner
    const productEntity = await this.productRepository.update(
      payload.id,
      payload.data
    );
    return { img: '', ...productEntity };
  }
  async remove(userId: string, payload: ProductRemoveDto): Promise<void> {
    await this.productRepository.remove(userId, payload.id)
  }
}
