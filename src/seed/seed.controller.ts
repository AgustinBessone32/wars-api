import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SeedService } from './seed.service';
@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}
  @Get()
  @ApiResponse({ status: 200, description: 'Seed database' })
  executeSeed() {
    return this.seedService.sexecuteSeed();
  }
}
