import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { WarsService } from './wars.service';

@Controller('wars')
export class WarsController {
  constructor(private readonly warsService: WarsService) {}

  @Post()
  create(@Body() createWarDto: CreateWarDto) {
    return this.warsService.create(createWarDto);
  }

  @Get()
  findAll() {
    return this.warsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateWarDto: UpdateWarDto) {
    return this.warsService.update(+id, updateWarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warsService.remove(+id);
  }
}
