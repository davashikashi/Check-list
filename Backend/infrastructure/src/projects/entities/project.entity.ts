import { Task } from 'src/tasks/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  asignatureName: string;

  @Column()
  img: string;

  @OneToMany(() => Task, task => task.project)
  tasks: Task[];
}
