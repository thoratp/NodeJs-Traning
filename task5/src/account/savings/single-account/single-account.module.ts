import { Module } from '@nestjs/common';

@Module({})
export class SingleAccountModule {
  constructor() {
    console.log(`This is single account module`);
  }
}
