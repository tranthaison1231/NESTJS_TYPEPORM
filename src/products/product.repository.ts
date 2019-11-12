import { Repository, EntityRepository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto, GetProductsFilterDto } from './dto/product.dto';
import { ProductStatus } from './product.model';

@EntityRepository()
export class ProductRepository extends Repository<Product> {
  async getProducts(filterDto: GetProductsFilterDto): Promise<Product[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('product');

    if (status) {
      query.andWhere('product.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(product.title LIKE :search OR prodcut.desc LIKE: search)',
        { search: `%${search}` },
      );
    }
    const products = await query.getMany();
    return products;
  }

  async addProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { title, desc } = createProductDto;
    const product = new Product();
    product.title = title;
    product.desc = desc;
    product.status = ProductStatus.OPEN;
    await product.save();
    return product;
  }
}
