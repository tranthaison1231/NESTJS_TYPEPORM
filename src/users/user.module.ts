import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './user.controller';
import { UserRepository } from './user.repository';
import { UsersService } from './user.service';
import { ProductsService } from '../products/products.service';
import { ProductRepository } from '../products/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([ProductRepository]),
  ],
  controllers: [UsersController],
  providers: [UsersService, ProductsService],
})
export class UsersModule {}
