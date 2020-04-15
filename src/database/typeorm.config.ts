import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import {
  RDS_DB_NAME,
  RDS_PASSWORD,
  RDS_USERNAME,
  RDS_PORT,
  RDS_HOSTNAME,
} from '../environments';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: RDS_HOSTNAME,
  port: RDS_PORT,
  username: RDS_USERNAME,
  password: RDS_PASSWORD,
  database: RDS_DB_NAME,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  synchronize: true,
};
