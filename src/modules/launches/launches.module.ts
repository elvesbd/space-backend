import { Module, forwardRef } from '@nestjs/common';
import { HealthCheckController } from './controllers/health-check';
import { GetAllController } from './controllers/get-all/get-all.controller';
import { GetAllService } from './application/services/get-all';
import { SharedModule } from '../shared';
import { MongooseRepositoryService } from '../shared/infra/adapters/mongo/repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Launch, LaunchSchema } from '../shared/infra/adapters/mongo/schemas';
import { HttpAdapterService } from '../shared/infra/adapters/http';
import { HttpModule } from '@nestjs/axios';
import { ExternalApiDataImporter } from './application/domain';

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
      useClass: HttpAdapterService,
    },
  ],
  exports: [ExternalApiDataImporter],
})
export class LaunchesModule {}
