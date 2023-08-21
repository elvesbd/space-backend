import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './modules/shared';
import { LaunchesModule } from './modules/launches';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule,
    LaunchesModule,
  ],
})
export class AppModule {}
