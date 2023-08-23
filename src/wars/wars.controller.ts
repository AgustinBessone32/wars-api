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

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.warsService.findOne(name);
  }

  @Put(':name')
  update(@Param('name') name: string, @Body() updateWarDto: UpdateWarDto) {
    return this.warsService.update(name, updateWarDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    console.log('siii');
    return 'si';
    //return this.warsService.remove(name);
  }
}
