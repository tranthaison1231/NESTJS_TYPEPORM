import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductsModule],
  providers: [AuthService],
})
export class AppModule {}
