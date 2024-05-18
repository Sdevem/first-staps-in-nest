import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SETTINGS } from 'src/app.utils';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'resposta da criação do usuário',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot register. Try again!' })
  async create(@Body(SETTINGS.VALIDATION_PIPE) createUserDto: CreateUserDto) {
    return await this.userService.store(createUserDto);
  }

  @Get()
  @ApiCreatedResponse({
    description: 'resposta da busca cacheada dos usários',
    type: User,
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'resposta da busca de dados privados do usuário',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('user/free-data/:id')
  @ApiCreatedResponse({
    description: 'resposta da busca de dados livres do usuário',
    type: User,
  })
  findOneFree(@Param('id') id: string) {
    return this.userService.findOneFree(+id);
  }
}
