import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';
export class CreateWarDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  episode_id: number;

  @IsString()
  @MinLength(1)
  title: string;

  @IsString()
  @MinLength(1)
  director: string;
}
