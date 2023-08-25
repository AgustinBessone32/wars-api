import {
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
export class CreateWarDto {
  @ApiProperty({
    default: 33,
    description: 'Number of episode',
    uniqueItems: true,
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  episode_id: number;
  @ApiProperty({
    default: 'War the best film',
    description: 'Title of film (war)',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(1)
  title: string;
  @ApiProperty({
    default: 'Agustin B',
    description: 'Name of director',
    uniqueItems: false,
  })
  @IsString()
  @MinLength(1)
  director: string;
  @ApiProperty({
    default: 'A Besso',
    description: 'Name of producer',
    uniqueItems: true,
  })
  @IsString()
  @MinLength(1)
  producer: string;
  @ApiProperty({
    default: '2023-08-24T17:07:47.081Z',
    description: 'Date of created film',
  })
  @IsString()
  @IsOptional()
  created: string;
  @ApiProperty({
    default: '2023-08-24T17:07:47.081Z',
    description: 'Date of edited film',
  })
  @IsString()
  @IsOptional()
  edited: string;
}
