import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExternalApiDataImporter } from 'src/modules/launches/application/domain';

@Injectable()
export class TaskService {
  constructor(
    private readonly externalApiDataImporter: ExternalApiDataImporter,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handle(): Promise<void> {
    await this.externalApiDataImporter.execute();
  }
}
