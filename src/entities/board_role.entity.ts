import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EBroadRole } from 'src/common/types/enum';
import { User } from './user.entity';
import { Board } from './board.entity';

@Entity('board_roles')
export class BoardRole {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Board, (board) => board.roles)
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @ManyToOne(() => User, (user) => user.boardRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: EBroadRole })
  role: EBroadRole;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
