// src/bootstrap.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import axios from 'axios';
import { MongooseRepositoryService } from './modules/shared/infra/adapters/mongo/repository';

async function test() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const launchesService = app.get(MongooseRepositoryService);

  try {
    const response = await axios.get('https://api.spacexdata.com/v4/launches');
    const launchesData = response.data;

    for (const launchData of launchesData) {
      await launchesService.save(launchData);
    }

    console.log('Launches saved successfully');
  } catch (error) {
    console.error('Error fetching and saving launches');
    console.error(error);
  }

  await app.close();
}

test();
