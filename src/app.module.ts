import { Module } from '@nestjs/common';
import { LaunchesModule } from './modules/launches';
import { SharedModule } from './modules/shared';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    LaunchesModule,
  ],
})
export class AppModule {}
