import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { List } from './list.entity';
import { BoardRole } from './board_role.entity';
import { Background } from './background.entity';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date;

  @Column({ name: 'background_id', nullable: true })
  backgroundId: string;

  @ManyToOne(() => Background, (background) => background.boards)
  @JoinColumn({ name: 'background_id' })
  background: Background;

  @OneToMany(() => List, (list) => list.board, { onDelete: 'CASCADE' })
  lists: List[];

  @OneToMany(() => BoardRole, (boardRole) => boardRole.board)
  roles: BoardRole[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
