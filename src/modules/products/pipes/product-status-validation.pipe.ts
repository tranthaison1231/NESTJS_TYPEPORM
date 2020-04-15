/* eslint-disable no-param-reassign */
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ProductStatus } from '../product-status.enum';

export class ProductStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    ProductStatus.OPEN,
    ProductStatus.IN_PROGRESS,
    ProductStatus.DONE,
  ];

  transform(value: string) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an valid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.indexOf(status) > -1;
  }
}
