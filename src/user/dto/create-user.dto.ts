import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';
import { MESSAGES, REGEX } from 'src/app.utils';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'Jhon Doe',
  })
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'Jhon.Doe' })
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'CPF do usuário deve ser uníco',
    example: '11111111111',
  })
  @IsNotEmpty()
  @Length(11, 11)
  cpf: string;

  @ApiProperty({
    description: 'Email do usuário deve ser uníco',
    example: 'jhon.doe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha de acesso do usuário',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  senha: string;

  @ApiProperty({
    description: 'Confirmar senha de acesso do usuário ',
    example: 'Password@123',
  })
  @IsNotEmpty()
  @Length(8, 24)
  @Matches(REGEX.PASSWORD_RULE, { message: MESSAGES.PASSWORD_RULE_MESSAGE })
  confirm: string;
}
