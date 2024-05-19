import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { CreateUserDto } from './dto/create-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private mailerService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
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

    await this.cacheManager.del('users');

    return await user.save();
  }

  async findAll() {
    const user = await User.createQueryBuilder('user')
      .select(['user.email', 'user.nome']) // added selection
      .getMany();

    const exist_data = await this.cacheManager.get('users');

    if (exist_data) {
      return await this.cacheManager.get('users');
    } else {
      await this.cacheManager.set('users', user, 0);

      return await this.cacheManager.get('users');
    }
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

    console.log('este', user);

    return user;
  }

  async findOne(id: number) {
    const user = await User.createQueryBuilder('user')
      .select(['user.id', 'user.login', 'user.nome', 'user.email', 'user.cpf']) // added selection
      .where({ id })
      .getOne();

    return user;
  }
}
