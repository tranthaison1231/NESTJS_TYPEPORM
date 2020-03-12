import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { ApiTags } from '@nestjs/swagger';
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
}
