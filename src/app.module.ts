import { Module } from '@nestjs/common';
// import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/config/typeorm.config';
import { ProductsModule } from '@/products/products.module';
import { AuthModule } from '@/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from '@/shared/http-error.filter';
import { TasksModule } from '@/tasks/tasks.module';
import { UsersModule } from '@/users/user.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ProductsModule,
    AuthModule,
    TasksModule,
    UsersModule,
    EventsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
