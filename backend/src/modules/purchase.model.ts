import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column()
  eventId!: number;

  @Column()
  eventTitle!: string;

  @Column()
  ticketType!: string;

  @Column()
  ticketName!: string;

  @Column()
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice!: number;

  @Column()
  paymentMethod!: string;

  @Column({ nullable: true })
  installments?: number;

  @Column({ nullable: true })
  discountType?: string;

  @Column({ unique: true })
  confirmationCode!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
