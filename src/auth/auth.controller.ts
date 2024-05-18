import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  signIn(@Body() logInDto: LogInDto) {
    return this.authService.signIn(logInDto.login, logInDto.senha);
  }

  //   @UseGuards(AuthGuard)
  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  getProfile(@Request() req) {
    console.log(req.headers);
    return req.user;
  }
}
