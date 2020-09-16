import { Injectable, HttpService } from '@nestjs/common';

import { SLACK_REMINDER } from '../../environments';

@Injectable()
export class SlackService {
  constructor(private httpService: HttpService) {}

  sendMessage(text: string) {
    return this.httpService.post(SLACK_REMINDER, { text });
  }
}
