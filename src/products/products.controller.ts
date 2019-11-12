import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductStatus } from './product.model';
import { CreateProductDto, GetProductsFilterDto } from './dto/product.dto';
import { isEmpty } from '../utils/object';
import { ProductStatusValidationPipe } from './pipes/product-status-validation.pipe';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @UsePipes(ValidationPipe)
  addProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.insertProduct(createProductDto);
  }
  @Get()
  getProducts(
    @Query(ValidationPipe) filterDto: GetProductsFilterDto,
  ): Product[] {
    return this.productsService.getProducts(filterDto);
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.getProductById(id);
  }
  // @Patch(':id')
  // updateProduct(
  //   @Param('id') prodId: string,
  //   @Body('title') prodTitle: string,
  //   @Body('description') prodDesc: string,
  //   @Body('price') prodPrice: number,
  // ) {
  //   this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
  //   return null;
  // }
  @Patch(':id/status')
  updateProductStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ProductStatusValidationPipe) status: ProductStatus,
  ): Promise<Product> {
    return this.productsService.updateProductStatus(id, status);
  }
  @Delete(':id')
  removeProduct(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.removeProduct(id);
  }
}
