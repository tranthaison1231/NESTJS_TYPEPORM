export interface Product {
  id: string;
  title: string;
  desc: string;
  price: number;
  status: ProductStatus;
}

export enum ProductStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
