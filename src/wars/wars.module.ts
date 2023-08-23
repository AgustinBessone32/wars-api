import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { War, WarSchema } from './entities/war.entity';
import { WarsController } from './wars.controller';
import { WarsService } from './wars.service';

@Module({
  controllers: [WarsController],
  providers: [WarsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: War.name,
        schema: WarSchema,
      },
    ]),
  ],
  exports: [MongooseModule],
})
export class WarsModule {}
