import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseRepositoryService } from './infra/adapters/mongo/repository';
import { LaunchesModule } from '../launches';
import { TaskService } from './infra/services/cron';
import { HttpSpaceXAdapterService } from './infra/adapters/http';
import { Launch, LaunchSchema } from './infra/adapters/mongo/schemas';

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
  providers: [MongooseRepositoryService, TaskService, HttpSpaceXAdapterService],
})
export class SharedModule {}
