import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { encode } from '../codec';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  views: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  toDto() {
    return {
      id: this.id,
      url: this.url,
      views: this.views,
      createAt: this.createAt,
      updateAt: this.updateAt,
      shorten: encode(this.id),
    };
  }
}
