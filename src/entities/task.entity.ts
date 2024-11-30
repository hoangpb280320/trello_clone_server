import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { EEtaskPriority, ETaskStatus } from 'src/common/types/enum';
import { Comment } from './comment.entity';
import { List } from './list.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: '50' })
  title: string;

  @Column({ type: 'varchar', length: '500', nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.createdTasks)
  @JoinColumn({ name: 'creator' })
  creator: User;

  @ManyToOne(() => User, (user) => user.assignedTasks, { nullable: true })
  @JoinColumn({ name: 'assignee' })
  assignee: User;

  @ManyToOne(() => User, (user) => user.createdTasks)
  @JoinColumn({ name: 'list_id' })
  list: List;

  @OneToMany(() => Comment, (comment) => comment.task, { onDelete: 'CASCADE' })
  comments: Comment[];

  @Column({ default: EEtaskPriority.low })
  priority: EEtaskPriority;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date;

  @Column({ default: ETaskStatus.normal })
  status: ETaskStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
