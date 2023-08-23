import { Module } from '@nestjs/common';
import { WarsModule } from '../wars/wars.module';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [WarsModule],
})
export class SeedModule {}
