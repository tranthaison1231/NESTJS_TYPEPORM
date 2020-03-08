import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductRepository } from './product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
