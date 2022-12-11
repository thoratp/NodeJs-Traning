import { Body, Controller, Get, Render, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.dto';
import { Response } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('home')
  @Render('home')
  getHomePage(): string {
    return '';
  }

  @Get('signup')
  getSignup(@Res() res: Response): any {
    res.render('signup', {
      errorMsg: '',
    });
  }

  @Post('signup')
  registerUser(@Body() user: User, @Res() res: Response) {
    if (user.username != '' && user.password != '' && user.email != '') {
      this.appService.registerUser(user);
      res.render('login', { errorMsg: '' });
    } else {
      res.render('signup', {
        errorMsg: 'Username, Email, Password can not be empty',
      });
    }
  }

  @Get('login')
  getLogin(@Res() res: Response): any {
    res.render('login', {
      errorMsg: '',
    });
  }

  @Post('login')
  loginUser(@Body() user: User, @Res() res: Response) {
    if (user.username != '' && user.password != '') {
      const validUser = this.appService.isValidUser(user);
      if (validUser) {
        res.render('welcome', {
          welcomeMsg: `Login successful , Welcome ${user.username}`,
        });
      } else {
        res.render('login', {
          errorMsg: 'User is not available',
        });
      }
    } else {
      res.render('login', {
        errorMsg: 'Username, Email, Password can not be empty',
      });
    }
  }
}
