import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './companies.entity';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { UserRepository } from '../users/user.repository';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
  imports: [TypeOrmModule.forFeature([Company, UserRepository])],
})
export class CompaniesModule {}
