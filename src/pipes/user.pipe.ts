import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UserPipe implements PipeTransform {
  transform(value: any) {
    return {
      name: value.usrName,
      age: value.usrAge,
      isActive: value.usrActive,
      email: value.usrEmail,
    };
  }
}

// https://www.youtube.com/watch?v=KyplQyXg6Z0
