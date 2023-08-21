import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { SharedModule } from '../shared';
import { MongooseRepositoryService } from '../shared/infra/adapters/mongo/repository';
import { Launch, LaunchSchema } from '../shared/infra/adapters/mongo/schemas';
import { HttpSpaceXAdapterService } from '../shared/infra/adapters/http';
import { ExternalApiDataImporter } from './application/domain';
import { PopulateInitialDataService } from './application/domain/populate-initial-data';
import { GetLaunchesChartDataController } from './controllers/get-launches-chart-data';
import {
  GetAllLaunchesService,
  GetLaunchChartDataService,
  GetLaunchPieChartDataService,
} from './application/services';
import {
  GetAllLaunchesController,
  GetLaunchPieChartDataController,
  HealthCheckController,
} from './controllers';

const launchControllers = [
  HealthCheckController,
  GetAllLaunchesController,
  GetLaunchesChartDataController,
  GetLaunchPieChartDataController,
];
const launchServices = [
  GetAllLaunchesService,
  ExternalApiDataImporter,
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
      provide: 'HTTP_SERVICE',
      useClass: HttpSpaceXAdapterService,
    },
  ],
  exports: [ExternalApiDataImporter, PopulateInitialDataService],
})
export class LaunchesModule {}
