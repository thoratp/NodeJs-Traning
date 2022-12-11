import { Body, Controller, Get, Render, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.dto';
import { Response } from 'express';
import { Thought } from './thoughts.dto';
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
        this.appService.setCurrentUser(user)
        res.render('thoughts', {
          welcomeMsg: ` Welcome ${user.username}`,
          thoughts: this.appService.getThoughts()
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

  @Get('thoughts')
  getWelcome(@Res() res: Response): any {
    res.render('thoughts', {
      welcomeMsg: ` Welcome `,
      thoughts: []
    });
  }
  @Get('create-thoughts')
  getCreateThought(@Res() res: Response): any {
    res.render('create-thoughts', {
      errorMsg: ``
    });
  }
  @Post('create-thoughts')
  saveThought(@Body() thought: Thought, @Res() res: Response) {
    const user = this.appService.getCurrentUser()
    if (user) {
      const validUser = this.appService.isValidUser(user);
      if (validUser) {
        this.appService.saveThought({ owner: user.username, thought: thought.thought })
        res.render('thoughts', {
          welcomeMsg: ` Welcome ${user.username}`,
          thoughts: this.appService.getThoughts()
        });
      }
    } else {
      res.render('login', {
        errorMsg: 'User is not loggedIn',
      });
    }
  }
}
