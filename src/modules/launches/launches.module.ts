import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/health-check';
import { GetAllController } from './controllers/get-all/get-all.controller';
import { GetAllService } from './application/services/get-all';
import { SharedModule } from '../shared';
import { MongooseRepositoryService } from '../shared/infra/adapters/mongo/repository';

@Module({
  imports: [SharedModule],
  controllers: [HealthCheckController, GetAllController],
  providers: [
    GetAllService,
    {
      provide: 'LAUNCHES_REPOSITORY',
      useClass: MongooseRepositoryService,
    },
  ],
})
export class LaunchesModule {}
