import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private mailerService: MailerService) {}
  async store(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.nome = createUserDto.nome;
    user.email = createUserDto.email;
    user.senha = createUserDto.senha;
    user.login = createUserDto.login;
    user.cpf = createUserDto.cpf;

    await this.mailerService.sendMail({
      to: createUserDto.email,
      from: 'sdevem.Magush@treinaweb.com.br',
      subject: 'Enviando Email com NestJS',
      html: `<h3 style="color: red">Bem-vindo ao nest</h3>`,
    });

    return await user.save();
  }

  async findAll() {
    const user = await User.createQueryBuilder('user')
      .select(['user.email', 'user.nome']) // added selection
      .getMany();

    return user;
  }

  async findOneFree(id: number) {
    const user = await User.createQueryBuilder('user')
      .select(['user.email', 'user.nome']) // added selection
      .where({ id })
      .getOne();

    return user;
  }

  async findOneCredentials(login: string) {
    const user = await User.createQueryBuilder('user')
      .select(['user.id', 'user.login', 'user.senha']) // added selection
      .where({ login })
      .getOne();

    console.log(user);

    return user;
  }

  
  findOne(id: number) {
    return User.findOne({ where: { id } });
  }
}
