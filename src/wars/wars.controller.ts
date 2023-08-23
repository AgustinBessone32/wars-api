import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../auth/guards/user-role/user-role.guard';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { WarsService } from './wars.service';

@Controller('wars')
export class WarsController {
  constructor(private readonly warsService: WarsService) {}

  @Post()
  @SetMetadata('roles', ['user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  create(@Body() createWarDto: CreateWarDto) {
    return this.warsService.create(createWarDto);
  }

  @Get()
  findAll() {
    return this.warsService.findAll();
  }

  @Get(':id')
  @SetMetadata('roles', ['user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  findOne(@Param('id') id: string) {
    return this.warsService.findOne(+id);
  }

  @Put(':id')
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  update(@Param('id') id: string, @Body() updateWarDto: UpdateWarDto) {
    return this.warsService.update(+id, updateWarDto);
  }

  @Delete(':id')
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  remove(@Param('id') id: string) {
    return this.warsService.remove(+id);
  }
}
