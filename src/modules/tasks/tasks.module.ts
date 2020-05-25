import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './tasks.service';
import { SlackModule } from '../../shared/slack/slack.module';

@Module({
  imports: [SlackModule, ScheduleModule.forRoot()],
  providers: [TasksService],
})
export class TasksModule {}
