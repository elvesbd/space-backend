import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseRepositoryService } from './infra/adapters/mongo/repository';
import { RocketLaunchesModule } from '../rocket-launches';
import { TaskService } from './infra/services/cron';
import { Launch, LaunchSchema } from './infra/adapters/mongo/schemas';
import { HttpLaunchesAdapterService } from './infra/adapters/http';
import { HttpRocketsAdapterService } from './infra/adapters/http/rockets/http-rockets-adapter.service';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => RocketLaunchesModule),
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
  providers: [
    MongooseRepositoryService,
    TaskService,
    HttpLaunchesAdapterService,
    HttpRocketsAdapterService,
  ],
})
export class SharedModule {}
