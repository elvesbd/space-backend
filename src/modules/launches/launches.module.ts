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

@Module({
  imports: [
    HttpModule,
    forwardRef(() => SharedModule),
    MongooseModule.forFeature([{ name: Launch.name, schema: LaunchSchema }]),
  ],
  controllers: [HealthCheckController, GetAllController],
  providers: [
    GetAllService,
    ExternalApiDataImporter,
    {
      provide: 'LAUNCHES_REPOSITORY',
      useClass: MongooseRepositoryService,
    },
    {
      provide: 'HTTP_SERVICE',
      useClass: HttpSpaceXAdapterService,
    },
  ],
  exports: [ExternalApiDataImporter],
})
export class LaunchesModule {}
