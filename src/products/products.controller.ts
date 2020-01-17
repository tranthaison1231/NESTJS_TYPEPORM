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
  UploadedFiles,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { ProductStatus } from './product-status.enum';
import { CreateProductDto, GetProductsFilterDto } from './dto/product.dto';
import { ProductStatusValidationPipe } from './pipes/product-status-validation.pipe';
import { Product } from './product.entity';
import { GetUser } from 'src/users/get-user-decorator';
import { User } from 'src/users/user.entity';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname } from 'path';
// import { multerOptions } from '../config/multer.config';
// import { uploadImage } from '../config/cloudinary.config';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Products')
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

  // @Post('uploads')
  // @UseInterceptors(FileInterceptor('image', multerOptions))
  // async uploadFile(@UploadedFiles() file) {
  //   console.log(file);
  // const result = await uploadImage(file);
  // console.log(result );
  // }
}
