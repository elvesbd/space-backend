import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/health-check';

@Module({
  imports: [],
  controllers: [HealthCheckController],
})
export class LaunchesModule {}
