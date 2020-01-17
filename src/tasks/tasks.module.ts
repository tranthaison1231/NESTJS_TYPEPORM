import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    // MulterModule.register({
    //   dest: UPLOAD_LOCATION,
    // }),
  ],
  providers: [TasksService],
})
export class TasksModule {}
