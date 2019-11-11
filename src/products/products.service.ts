import { Injectable, Get, NotFoundException } from '@nestjs/common';
import { Product, ProductStatus } from './product.model';
import * as uuid from 'uuid/v1';
import { CreateProductDto, GetProductsFilterDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }

  insertProduct(createProductDto: CreateProductDto) {
    const { title, desc, price } = createProductDto;
    const product: Product = {
      id: uuid(),
      title,
      desc,
      price,
      status: ProductStatus.OPEN,
    };
    this.products.push(product);
    return product.id;
  }
  getAllProducts(): Product[] {
    return [...this.products];
  }

  getProductsWithFilter(filterDto: GetProductsFilterDto): Product[] {
    const { status, search } = filterDto;
    let products = this.getAllProducts();
    if (status) {
      products = products.filter(prod => prod.status === status);
    }
    if (search) {
      products = products.filter(
        prod => prod.title.includes(search) || prod.desc.includes(search),
      );
    }
    return products;
  }

  getSingleProduct(prodId): Product {
    const found = this.products.find(prod => prod.id === prodId);
    if (!found) {
      throw new NotFoundException(`Task with ID ${prodId} not found`);
    }
    return found;
  }
  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.desc = desc;
    }
    if (title) {
      updateProduct.price = price;
    }
    this.products[index] = updateProduct;
  }

  updateProductStatus(productId: string, status: ProductStatus) {
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    if (status) {
      updateProduct.status = status;
    }
    this.products[index] = updateProduct;
  }

  removeProduct(productId: string): void {
    const found = this.getSingleProduct(productId);
    this.products = this.products.filter(prod => prod.id !== productId);
  }
}
