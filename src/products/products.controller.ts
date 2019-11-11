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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, ProductStatus } from './product.model';
import { CreateProductDto, GetProductsFilterDto } from './dto/product.dto';
import { isEmpty } from 'src/utils/object';
import { ProductStatusValidationPipe } from './pipes/product-status-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  @UsePipes(ValidationPipe)
  addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.insertProduct(createProductDto);
  }
  @Get()
  getProducts(
    @Query(ValidationPipe) filterDto: GetProductsFilterDto,
  ): Product[] {
    if (!isEmpty(filterDto)) {
      return this.productsService.getProductsWithFilter(filterDto);
    }
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }
  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
    return null;
  }
  @Patch(':id/status')
  updateProductStatus(
    @Param('id') prodId: string,
    @Body('status', ProductStatusValidationPipe) status: ProductStatus,
  ) {
    return this.productsService.updateProductStatus(prodId, status);
  }
  @Delete(':id')
  removeProduct(@Param('id') prodId: string) {
    this.productsService.removeProduct(prodId);
    return null;
  }
}
