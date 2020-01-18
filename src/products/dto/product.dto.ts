import { ProductStatus } from '../product-status.enum';
import { IsNotEmpty, IsOptional, IsIn, IsArray } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

// export class CreateMultiProductDto {
//   @IsArray()
//   data: Array<CreateProductDto>;
// }

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

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}
