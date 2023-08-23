import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { WarsModule } from './wars/wars.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/wars-database'),
    WarsModule,
    SeedModule,
    AuthModule,
  ],
})
export class AppModule {}
