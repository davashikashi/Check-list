import { ApiProperty } from '@nestjs/swagger';
import { isNotEmpty, IsOptional } from 'class-validator';

export class CreateProjectDto {

    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Math' })
    @IsOptional()
    asignatureName: string;

    @ApiProperty({ example: 'https://example.com/image.png' })
    @IsOptional()
    img: string;

    @ApiProperty({ example: [] })
    @IsOptional()
    tasks: [];
}
