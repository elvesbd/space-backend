import { Module } from '@nestjs/common';
import { HealthCheckController } from './controllers/health-check';
import { GetAllController } from './controllers/get-all/get-all.controller';
import { GetAllService } from './application/services/get-all';
import { SharedModule } from '../shared';
import { MongooseRepositoryService } from '../shared/infra/adapters/mongo/repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Launch, LaunchSchema } from '../shared/infra/adapters/mongo/schemas';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forFeature([{ name: Launch.name, schema: LaunchSchema }]),
  ],
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
