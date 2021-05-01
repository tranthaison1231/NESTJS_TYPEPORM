import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerminusModule } from '@nestjs/terminus';
import { typeOrmConfig } from '@/database/typeorm.config';
import { AuthModule } from '@/modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '@/shared/http-error.filter';
// import here
import { TasksModule } from '@/modules/tasks/tasks.module';
import * as rateLimit from 'express-rate-limit';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AwsService } from '../shared/aws.service';
import { TransactionsModule } from './transactions/transaction.module';
import { TripsModule } from './trips/trips.module';
import { DriversModule } from './drivers/drivers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        rateLimit({
          windowMs: 5 * 60 * 1000, // 10 minutes
          max: 10, // limit each IP to 100 requests per windowMs
          message: '{"message": "Request so much. Let try after 5 minute."}',
        }),
      )
      .forRoutes({ path: 'auth/signin', method: RequestMethod.POST });
  }
}
