import { Module, forwardRef } from '@nestjs/common';
import { MongooseRepositoryService } from './infra/adapters/mongo/repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Launch, LaunchSchema } from './infra/adapters/mongo/schemas';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './infra/services/cron';
import { HttpAdapterService } from './infra/adapters/http';
import { HttpModule } from '@nestjs/axios';
import { ExternalApiDataImporter } from '../launches/application/domain';
import { LaunchesModule } from '../launches';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => LaunchesModule),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        dbName: 'space',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Launch.name, schema: LaunchSchema }]),
    ScheduleModule.forRoot(),
  ],
  providers: [MongooseRepositoryService, TaskService, HttpAdapterService],
})
export class SharedModule {}
