import { Module } from '@nestjs/common';
import { LaunchesModule } from './modules/launches';

@Module({
  imports: [LaunchesModule],
})
export class AppModule {}
