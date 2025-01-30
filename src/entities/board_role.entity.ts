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

  @Column({ name: 'board_id' })
  boardId: number;

  @ManyToOne(() => Board, (board) => board.roles)
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.boardRoles)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: EBroadRole })
  role: EBroadRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
