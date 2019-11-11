import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'shyn',
  password: '6526393son',
  database: 'productManagment',
  entities: [__dirname + '/../**/*.entity.ts'],
  synchronize: true,
};
