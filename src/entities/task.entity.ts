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

  @Column({ name: 'creator_id' })
  creatorId: string;

  @ManyToOne(() => User, (user) => user.createdTasks)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Column({ name: 'assignee_id', nullable: true })
  assigneeId: string;

  @ManyToOne(() => User, (user) => user.assignedTasks, { nullable: true })
  @JoinColumn({ name: 'assignee_id' })
  assignee: User;

  @Column({ name: 'list_id' })
  listId: number;

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
