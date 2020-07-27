import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
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
  subscribers: [`${__dirname}/../**/*.subscriber.{js,ts}`],
  // We are using migrations, synchronize should be set to false.
  // synchronize: process.env.TYPEORM_MIGRATIONS_RUN !== 'true',
  // dropSchema: false,
  // migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  // migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  // logging: ['warn', 'error'],
  // cli: {
  //   migrationsDir: 'src/database/migrations',
  // },
};
