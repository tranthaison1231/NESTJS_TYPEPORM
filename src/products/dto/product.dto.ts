import { ProductStatus } from '../product-status.enum';
import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  price: number;
}
export class GetProductsFilterDto {
  @IsOptional()
  @IsIn([ProductStatus.OPEN, ProductStatus.IN_PROGRESS, ProductStatus.DONE])
  @ApiPropertyOptional({
    enum: ProductStatus,
  })
  status: ProductStatus;

  @IsOptional()
  @ApiPropertyOptional()
  @IsNotEmpty()
  search: string;
}
