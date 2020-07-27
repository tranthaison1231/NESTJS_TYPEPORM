import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { typeOrmConfig } from '@/database/typeorm.config';
import { AuthModule } from '@/modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '@/shared/http-error.filter';
// import here
import { TasksModule } from '@/modules/tasks/tasks.module';
import { EasyconfigModule } from 'nestjs-easyconfig';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AwsService } from '../shared/aws.service';
import { TransactionsModule } from './transactions/transaction.module';
import { TripsModule } from './trips/trips.module';
import { DriversModule } from './drivers/drivers.module';

@Module({
  imports: [
    // EasyconfigModule.register({ path: './config/.env', safe: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TerminusModule,
    // add here
    AuthModule,
    TasksModule,
    EventsModule,
    UsersModule,
    TransactionsModule,
    TripsModule,
    DriversModule,
  ],
  controllers: [AppController],
  providers: [
    AwsService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
