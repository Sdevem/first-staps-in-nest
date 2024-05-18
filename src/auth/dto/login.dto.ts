import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogInDto {
  @ApiProperty({
    description: 'login de acesso',
    example: 'Jhon.Doe',
  })
  @IsNotEmpty()
  @IsEmail()
  login: string;

  @ApiProperty({
    description: 'Senha de acesso',
    example: 'Password@123',
  })
  @IsNotEmpty()
  senha: string;
}
