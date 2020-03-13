import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './companies.entity';
import { UserRepository } from '../users/user.repository';

@Injectable()
export class CompaniesService extends TypeOrmCrudService<Company> {
  constructor(
    @InjectRepository(Company) companiesService: Repository<Company>,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super(companiesService);
  }

  async addUser(id: string, userID: string[]): Promise<Company> {
    const company = await this.findOne(id);
    userID.forEach(async e => {
      const user = await this.userRepository.findOne(e);
      company.users = await [...company.users, user];
    });
    await company.save();
    return company;
  }
}
