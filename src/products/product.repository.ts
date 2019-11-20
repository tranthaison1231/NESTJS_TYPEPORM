import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, GetProductsFilterDto } from './dto/product.dto';
import { ProductStatus } from './product.model';
import { User } from 'src/auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  private logger = new Logger('ProductRepository');

  async getProducts(
    filterDto: GetProductsFilterDto,
    user: User,
  ): Promise<Product[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('product');

    query.where('product.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('product.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(product.title LIKE :search OR prodcut.desc LIKE: search)',
        { search: `%${search}` },
      );
    }
    try {
      const products = await query.getMany();
      return products;
    } catch (error) {
      this.logger.error(
        `Failed to get task for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async addProduct(
    createProductDto: CreateProductDto,
    user: User,
  ): Promise<Product> {
    const { title, desc } = createProductDto;
    const product = new Product();
    product.title = title;
    product.desc = desc;
    product.status = ProductStatus.OPEN;
    product.user = user;
    try {
      await product.save();
    } catch (error) {
      this.logger.error(
        `Failed to create a task for userId "${user.username}. Data: ${createProductDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return product;
  }
}
