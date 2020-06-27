import { Injectable, Logger, HttpService } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { SlackService } from '../../shared/slack/slack.service';
import { SLACK_REMINDER } from '../../environments';
import { trainData } from '../../utils/timeseries';

@Injectable()
export class TasksService {
  constructor(private slackService: SlackService) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron('00 00 07 * * *')
  handleCron() {
    this.slackService
      .sendMessage('Hello, chào buổi sáng, anh đẹp trai dễ thương')
      .subscribe();
    this.logger.debug('Called when the second is 45');
  }

  // @Interval(5000)
  // handleInterval() {
  //   this.logger.debug('Called every 5 seconds');
  // }

  // @Timeout(5000)
  // async handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  //   await trainData();
  //   this.logger.log('Success');
  // }
}
