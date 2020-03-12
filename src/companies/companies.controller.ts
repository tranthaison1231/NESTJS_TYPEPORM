import { Controller, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Company } from './companies.entity';
import { CompaniesService } from './companies.service';
import { CreateCompaniesDto } from './dto/companies.dto';

@Crud({
  model: {
    type: Company,
  },
  dto: {
    create: CreateCompaniesDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
})
@ApiTags('Companies')
@Controller('companies')
export class CompaniesController implements CrudController<Company> {
  constructor(public service: CompaniesService) {}

  @ApiOperation({
    summary: 'Add new user for company',
  })
  @Post(':id/users')
  addUser(@Param('id', ParseUUIDPipe) id: string): void {
    console.log(id);
  }
}
