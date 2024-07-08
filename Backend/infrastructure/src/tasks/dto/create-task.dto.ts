import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../../projects/entities/project.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Homework' })
    taskName: string;

    @ApiProperty({ example: 'Complete math homework' })
    description: string;

    @ApiProperty({ example: false })
    checkBox: boolean;

    @ApiProperty({ example: '2024-07-01T00:00:00Z' })
    fechaInicio: Date;

    @ApiProperty({ example: '2024-07-15T00:00:00Z' })
    fechaFinal: Date;

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    projectId: number;
}


