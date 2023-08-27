import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './modules/shared';
import { RocketLaunchesModule } from './modules/rocket-launches';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    RocketLaunchesModule,
  ],
})
export class AppModule {}
