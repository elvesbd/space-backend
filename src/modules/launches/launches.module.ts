import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/health-check';
import { GetAllController } from './controllers/get-all/get-all.controller';
import { GetAllService } from './application/services/get-all';
import { SharedModule } from '../shared';
import { TypeORMRepositoryService } from '../shared/infra/adapters';

@Module({
  imports: [SharedModule],
  controllers: [HealthCheckController, GetAllController],
  providers: [
    GetAllService,
    {
      provide: 'LAUNCHES_REPOSITORY',
      useClass: TypeORMRepositoryService,
    },
  ],
})
export class LaunchesModule {}
