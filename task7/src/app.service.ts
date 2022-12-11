import { Injectable } from '@nestjs/common';
import { User } from './user.dto';
@Injectable()
export class AppService {
  private user: User = {
    username: '',
    password: '',
    email: '',
  };
  UserInfo: User[] = [];

  registerUser(user: User) {
    this.UserInfo.push(user);
  }
  isValidUser(user: User): boolean {
    const isFind = this.UserInfo.find((obj) => obj.username == user.username);
    return isFind ? true : false;
  }
  getUserAvailabilty() {
    const length = this.UserInfo.length
    return length > 0 ? true : false;
  }
}
