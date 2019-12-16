import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.RDS_HOSTNAME || 'localhost',
  port: +process.env.RDS_PORT || 5432,
  username: process.env.RDS_USERNAME || 'xxx',
  password: process.env.RDS_PASSWORD || 'xxx',
  database: process.env.RDS_DB_NAME || 'xxx',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
