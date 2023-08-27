import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { SharedModule } from '../shared';
import { Launch, LaunchSchema } from '../shared/infra/adapters/mongo/schemas';
import { MongooseRepositoryService } from '../shared/infra/adapters/mongo/repository';
import {
  LatestLaunchImporter,
  PopulateInitialDataService,
} from './application/domain';

import {
  GetAllLaunchesService,
  GetLaunchChartDataService,
  GetLaunchPieChartDataService,
} from './application/services';
import {
  HealthCheckController,
  GetAllLaunchesController,
  GetLaunchesChartDataController,
  GetLaunchesPieChartDataController,
} from './controllers';
import {
  HttpRocketsAdapterService,
  HttpLaunchesAdapterService,
} from '../shared/infra/adapters/http';

const launchControllers = [
  HealthCheckController,
  GetAllLaunchesController,
  GetLaunchesChartDataController,
  GetLaunchesPieChartDataController,
];
const launchServices = [
  GetAllLaunchesService,
  LatestLaunchImporter,
  PopulateInitialDataService,
  GetLaunchChartDataService,
  GetLaunchPieChartDataService,
];

@Module({
  imports: [
    HttpModule,
    forwardRef(() => SharedModule),
    MongooseModule.forFeature([{ name: Launch.name, schema: LaunchSchema }]),
  ],
  controllers: [...launchControllers],
  providers: [
    ...launchServices,
    {
      provide: 'LAUNCHES_REPOSITORY',
      useClass: MongooseRepositoryService,
    },
    {
      provide: 'LAUNCHES_HTTP_SERVICE',
      useClass: HttpLaunchesAdapterService,
    },
    {
      provide: 'ROCKETS_HTTP_SERVICE',
      useClass: HttpRocketsAdapterService,
    },
  ],
  exports: [LatestLaunchImporter, PopulateInitialDataService],
})
export class RocketLaunchesModule {}
