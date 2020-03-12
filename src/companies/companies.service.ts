import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './companies.entity';

@Injectable()
export class CompaniesService extends TypeOrmCrudService<Company> {
  constructor(
    @InjectRepository(Company) companiesService: Repository<Company>,
  ) {
    super(companiesService);
  }
}
