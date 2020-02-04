import {
  Injectable,
  Get,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { ProductStatus } from './product-status.enum';
import { CreateProductDto, GetProductsFilterDto } from './dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { Product } from './product.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async insertProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    return this.productRepository.addProduct(createProductDto, user);
  }

  // async insertMultiProduct(
  //   createProductDto: CreateProductDto,
  //   user: User,
  // ): Promise<Product> {
  //   return this.productRepository.addMultiProduct(createProductDto, user);
  // }

  async getProducts(
    filterDto: GetProductsFilterDto,
    user: User,
  ): Promise<Product[]> {
    return this.productRepository.getProducts(filterDto, user);
  }

  async getProductById(id: string, user: User): Promise<Product> {
    const found = await this.productRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async updateProductStatus(
    id: string,
    status: ProductStatus,
    user: User,
  ): Promise<Product> {
    const product = await this.getProductById(id, user);
    product.status = status;
    await product.save();
    return product;
  }

  async removeProduct(id: string, user: User): Promise<void> {
    const result = await this.productRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID "${id}" not found`);
    }
  }

  async removeAllProduct(id: number): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
