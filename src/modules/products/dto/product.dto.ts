import { IsNotEmpty, IsOptional, IsIn, IsArray } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { ProductStatus } from '../product-status.enum';

export class CreateProductDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  price: number;
}

export class GetStatusDto {
  @IsOptional()
  @IsIn([ProductStatus.OPEN, ProductStatus.IN_PROGRESS, ProductStatus.DONE])
  @ApiPropertyOptional({
    description: 'The status of Product',
    enum: ProductStatus,
    default: ProductStatus.OPEN,
  })
  status: ProductStatus;
}

export class GetProductsFilterDto extends GetStatusDto {
  @IsOptional()
  @ApiPropertyOptional()
  @IsNotEmpty()
  search: string;
}
