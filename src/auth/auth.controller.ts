import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/login.dto';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(200)
  signIn(@Body() logInDto: LogInDto) {
    return this.authService.signIn(logInDto.login, logInDto.senha);
  }

  //   @UseGuards(AuthGuard)
  @Get('user/:id')
  @ApiCreatedResponse({
    description: 'resposta da busca de dados privados do usuário',
    type: User,
  })
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
