import { Module } from '@nestjs/common';
import { MongooseRepositoryService } from './infra/adapters/mongo/repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Launch, LaunchSchema } from './infra/adapters/mongo/schemas';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        dbName: 'space',
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Launch.name, schema: LaunchSchema }]),
  ],
  providers: [MongooseRepositoryService],
})
export class SharedModule {}
