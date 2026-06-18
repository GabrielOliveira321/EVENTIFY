import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  cpf?: string;

  @Column({ nullable: true })
  telefone?: string;

  @Column({ nullable: true })
  dataNascimento?: string;

  @Column({ nullable: true })
  cep?: string;

  @Column({ nullable: true })
  rua?: string;

  @Column({ nullable: true })
  numero?: string;

  @Column({ nullable: true })
  bairro?: string;

  @Column({ nullable: true })
  cidade?: string;

  @Column({ nullable: true })
  nomeCartao?: string;

  @Column({ nullable: true })
  numeroCartao?: string;

  @Column({ nullable: true })
  validadeCartao?: string;
}