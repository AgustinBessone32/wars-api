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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoleGuard } from '../auth/guards/user-role/user-role.guard';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { War } from './entities/war.entity';
import { WarsService } from './wars.service';
@ApiTags('Wars')
@Controller('wars')
export class WarsController {
  constructor(private readonly warsService: WarsService) {}

  @Post()
  @ApiResponse({ status: 200, description: 'War created', type: War })
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  create(@Body() createWarDto: CreateWarDto): Promise<War> {
    return this.warsService.create(createWarDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Get wars', type: [War] })
  findAll(): Promise<War[]> {
    return this.warsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get war', type: War })
  @SetMetadata('roles', ['user'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  findOne(@Param('id') id: string): Promise<War> {
    return this.warsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'War updated', type: War })
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  update(@Param('id') id: string, @Body() updateWarDto: UpdateWarDto) {
    return this.warsService.update(id, updateWarDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'War deleted' })
  @SetMetadata('roles', ['admin'])
  @UseGuards(AuthGuard(), UserRoleGuard)
  remove(@Param('id') id: string) {
    return this.warsService.remove(id);
  }
}
