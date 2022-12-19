import { forwardRef, Module } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PaymentController } from './payment.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController,PaymentController],
  providers: [UsersService,AuthService,JwtService],
  exports:[TypeOrmModule,UsersService]
  
})
export class UsersModule {}
