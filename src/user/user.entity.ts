import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({
    description: 'chave primaria gerada automaticamente do usuário',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nome do usuário', example: 'Jhon.Doe' })
  @Column({ unique: true })
  login: string;

  @ApiProperty({
    description: 'Senha de acesso do usuário',
    example: 'Password@123',
  })
  @Column()
  senha: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'Jhon Doe' })
  @Column()
  nome: string;

  @ApiProperty({
    description: 'CPF do usuário deve ser uníco',
    example: '11111111111',
  })
  @Column({
    unique: true,
  })
  cpf: string;

  @ApiProperty({
    description: 'Email do usuário deve ser uníco',
    example: 'jhon.doe@gmail.com',
  })
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({ description: 'Data da criação do usuário' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Data da ultima alteração do usuário' })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async setSenha(senha: string) {
    const salt = await bcrypt.genSalt();
    this.senha = await bcrypt.hash(senha || this.senha, salt);
  }
}
