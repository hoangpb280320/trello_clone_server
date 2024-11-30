import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from './list.entity';
import { EBoardTheme } from 'src/types/enum';
import { BoardRole } from './board_role.entity';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date;

  @Column({ type: 'enum', enum: EBoardTheme, default: EBoardTheme.dark })
  theme: EBoardTheme;

  @OneToMany(() => List, (list) => list.board, { onDelete: 'CASCADE' })
  lists: List[];

  @OneToMany(() => BoardRole, (boardRole) => boardRole.board)
  roles: BoardRole[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
