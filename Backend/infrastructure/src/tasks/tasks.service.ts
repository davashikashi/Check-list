import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Project } from '../projects/entities/project.entity'; // Asegúrate de importar Project aquí

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>, // Asegúrate de inyectar ProjectRepository aquí
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({ where: { id } });
  }

  async findByProject(projectId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { project: { id: projectId } } });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { projectId, ...rest } = createTaskDto;
    const project = await this.projectRepository.findOne({ where: { id: projectId } });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    const task = this.taskRepository.create({ project, ...rest });
    return this.taskRepository.save(task);
  }

  async update(id: number, updateTaskDto: CreateTaskDto): Promise<void> {
    const { projectId, ...rest } = updateTaskDto;
    const project = await this.projectRepository.findOne({ where: { id: projectId } });

    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    await this.taskRepository.update(id, { project, ...rest });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
