import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { War, WarSchema } from './entities/war.entity';
import { WarsController } from './wars.controller';
import { WarsService } from './wars.service';

@Module({
  controllers: [WarsController],
  providers: [WarsService],
  imports: [
    AuthModule,
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
