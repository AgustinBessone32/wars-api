import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WarsModule } from './wars/wars.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/wars-databse'),
    WarsModule,
  ],
})
export class AppModule {}
