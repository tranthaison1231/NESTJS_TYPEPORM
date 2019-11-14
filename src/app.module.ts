import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { ProductRepository } from './products/product.repository';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductsModule],
  providers: [ProductRepository],
})
export class AppModule {}
