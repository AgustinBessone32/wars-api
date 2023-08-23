import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from '../config/configuration';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { WarsModule } from './wars/wars.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/wars-database'),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    WarsModule,
    SeedModule,
    AuthModule,
  ],
})
export class AppModule {}
