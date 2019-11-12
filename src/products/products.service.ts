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

  // getProductsWithFilter(filterDto: GetProductsFilterDto): Product[] {
  //   const { status, search } = filterDto;
  //   let products = this.getAllProducts();
  //   if (status) {
  //     products = products.filter(prod => prod.status === status);
  //   }
  //   if (search) {
  //     products = products.filter(
  //       prod => prod.title.includes(search) || prod.desc.includes(search),
  //     );
  //   }
  //   return products;
  // }

  async getProductById(id: number): Promise<Product> {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  // updateProduct(productId: string, title: string, desc: string, price: number) {
  //   const [product, index] = this.findProduct(productId);
  //   const updateProduct = { ...product };
  //   if (title) {
  //     updateProduct.title = title;
  //   }
  //   if (desc) {
  //     updateProduct.desc = desc;
  //   }
  //   if (title) {
  //     updateProduct.price = price;
  //   }
  //   this.products[index] = updateProduct;
  // }

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
