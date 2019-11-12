import { Injectable, Get, NotFoundException } from '@nestjs/common';
import { ProductStatus } from './product.model';
import { CreateProductDto, GetProductsFilterDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async insertProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepository.addProduct(createProductDto);
  }

  getProducts(filterDto: GetProductsFilterDto): Product[] {
    return this.productRepository.getProducts(filterDto);
  }

  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async updateProductStatus(
    id: number,
    status: ProductStatus,
  ): Promise<Product> {
    const product = await this.getProductById(id);
    product.status = status;
    await product.save();
    return product;
  }

  async removeProduct(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
}
