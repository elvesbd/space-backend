import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/health-check';
import { GetAllController } from './controllers/get-all/get-all.controller';
import { GetAllService } from './application/services/get-all';

@Module({
  imports: [],
  controllers: [HealthCheckController, GetAllController],
  providers: [GetAllService],
})
export class LaunchesModule {}
