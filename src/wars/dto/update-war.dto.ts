import { PartialType } from '@nestjs/swagger';
import { CreateWarDto } from './create-war.dto';

export class UpdateWarDto extends PartialType(CreateWarDto) {}
