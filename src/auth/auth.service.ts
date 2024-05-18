import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, sen: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOneCredentials(login);
    if (!user) throw new BadRequestException();

    if (!(await bcrypt.compare(sen, user.senha)))
      throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.nome };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
