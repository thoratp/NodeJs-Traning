import { Injectable } from '@nestjs/common';
import { Thought } from './thoughts.dto';
import { User } from './user.dto';
@Injectable()
export class AppService {
  private user: User = {
    username: '',
    password: '',
    email: '',
  };
  private thought: Thought = {
    owner: '',
    thought: '',
  };
  userInfo: User[] = [];
  thoughtInfo: Thought[] = [];

  registerUser(user: User) {
    this.userInfo.push(user);
  }
  isValidUser(user: User): boolean {
    const isFind = this.userInfo.find((obj) => obj.username == user.username);
    return isFind ? true : false;
  }
  getUserAvailabilty() {
    const length = this.userInfo.length
    return length > 0 ? true : false;
  }
  setCurrentUser(user) {
    this.user = user
  }
  getCurrentUser() {
    return this.user
  }
  getThoughts() {
    return this.thoughtInfo
  }
  saveThought(thought: Thought) {
    this.thoughtInfo.push(thought)
  }
}
