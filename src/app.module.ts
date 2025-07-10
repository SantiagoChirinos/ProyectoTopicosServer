import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DataController } from './data.controller';
import { FeatureFlagController } from './featureflag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';
import { RoleFlagGuard } from './feature-flags/role-flag.guard';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    AuthModule,
    SongsModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/proyecto-topicos'),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [DataController, FeatureFlagController],
  providers: [
    Reflector,
    {
      provide: APP_GUARD,
      useClass: RoleFlagGuard,
    },
  ],
})
export class AppModule {}
