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
  UseInterceptors,
  Res,
  UploadedFile,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/get-user-decorator';
import { User } from 'src/users/user.entity';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiQuery,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { ProductStatus } from './product-status.enum';
import {
  CreateProductDto,
  GetProductsFilterDto,
  // CreateMultiProductDto,
} from './dto/product.dto';
import { ProductStatusValidationPipe } from './pipes/product-status-validation.pipe';
import { Product } from './product.entity';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
@UseGuards(AuthGuard())
export class ProductsController {
  private logger = new Logger('ProductController');

  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    summary: 'Create New Product',
  })
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

  @ApiOperation({
    summary: 'Get List of Products',
  })
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
  @ApiOperation({
    summary: 'Get Detail Product by ID',
  })
  getProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.getProductById(id, user);
  }

  @Patch(':id/status')
  updateProductStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status', ProductStatusValidationPipe) status: ProductStatus,
    @GetUser() user: User,
  ): Promise<Product> {
    return this.productsService.updateProductStatus(id, status, user);
  }

  @Delete(':id')
  removeProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.productsService.removeProduct(id, user);
  }

  @Delete()
  removeAllProduct(@GetUser() user: User): Promise<void> {
    return this.productsService.removeAllProduct(user.id);
  }
}
