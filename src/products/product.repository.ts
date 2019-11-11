import { Repository, EntityRepository } from "typeorm";
import { Product } from "./product.entity";

@EntityRepository()
export class ProductRepository extends Repository<Product>  