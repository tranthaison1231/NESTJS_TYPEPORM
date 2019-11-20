import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { ProductStatus } from './product.model';
import { CreateProductDto, GetProductsFilterDto } from './dto/product.dto';
import { ProductStatusValidationPipe } from './pipes/product-status-validation.pipe';
import { Product } from './product.entity';
import { GetUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';

@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  private logger = new Logger('ProductController');

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  addProduct(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ): Promise<Product> {
    this.logger.verbose(
      `User "${user.username}" created a new task.  Data ${JSON.stringify(
        createProductDto,
      )}`,
    );
    return this.productsService.insertProduct(createProductDto, user);
  }

  @Get()
  getProducts(
    @Query(ValidationPipe) filterDto: GetProductsFilterDto,
    @GetUser() user: User,
  ): Promise<Product[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. ${filterDto}`,
    );
    return this.productsService.getProducts(filterDto, user);
  }

  @Get('/:id')
  getProduct(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.getProductById(id, user);
  }

  @Patch(':id/status')
  updateProductStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ProductStatusValidationPipe) status: ProductStatus,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.updateProductStatus(id, status, user);
  }

  @Delete(':id')
  removeProduct(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.productsService.removeProduct(id, user);
  }
}
