import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { HealthCheckController } from './controllers/health-check';
import { GetAllController } from './controllers/get-all/get-all.controller';
import { SharedModule } from '../shared';
import { MongooseRepositoryService } from '../shared/infra/adapters/mongo/repository';
import { Launch, LaunchSchema } from '../shared/infra/adapters/mongo/schemas';
import { HttpSpaceXAdapterService } from '../shared/infra/adapters/http';
import { ExternalApiDataImporter } from './application/domain';
import { GetAllService } from './application/services/get-all';
import { PopulateInitialDataService } from './application/domain/populate-initial-data';
import { LaunchService } from './application/services/stats/statis.service';
import { GetLaunchesChartDataController } from './controllers/get-launches-chart-data';
import {
  GetLaunchChartDataService,
  GetLaunchPieChartDataService,
} from './application/services';
import { GetLaunchPieChartDataController } from './controllers';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => SharedModule),
    MongooseModule.forFeature([{ name: Launch.name, schema: LaunchSchema }]),
  ],
  controllers: [
    HealthCheckController,
    GetAllController,
    GetLaunchesChartDataController,
    GetLaunchPieChartDataController,
  ],
  providers: [
    GetAllService,
    ExternalApiDataImporter,
    PopulateInitialDataService,
    LaunchService,
    GetLaunchChartDataService,
    GetLaunchPieChartDataService,
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
