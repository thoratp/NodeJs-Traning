import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
@Module({
  imports: [ TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'bank',
    autoLoadEntities: true,
    entities: [],
    synchronize: true,
  }),UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,UsersService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {
  }
}
