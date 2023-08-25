import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { WarsModule } from './wars/wars.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB),
    WarsModule,
    SeedModule,
    AuthModule,
  ],
})
export class AppModule {}
