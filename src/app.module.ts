import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/database/typeorm.config';
import { ProductsModule } from '@/modules/products/products.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '@/shared/http-error.filter';
// import here
import { TasksModule } from '@/modules/tasks/tasks.module';
import { UsersModule } from '@/modules/users/user.module';
import { EventsModule } from './modules/events/events.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CardsModule } from './modules/cards/cards.module';
import { AppController } from './app.controller';
import { AwsService } from './shared/aws.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    // add here
    ProductsModule,
    AuthModule,
    TasksModule,
    UsersModule,
    EventsModule,
    CompaniesModule,
    CardsModule,
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
