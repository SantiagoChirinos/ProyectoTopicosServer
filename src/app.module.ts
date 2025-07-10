import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DataController } from './data.controller';
import { FeatureFlagController } from './featureflag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    SongsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/proyecto-topicos'),
  ],
  controllers: [DataController, FeatureFlagController],
  providers: [],
})
export class AppModule {}
