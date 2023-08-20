import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExternalApiDataImporter } from 'src/modules/launches/application/domain';

@Injectable()
export class TaskService {
  constructor(
    private readonly externalApiDataImporter: ExternalApiDataImporter,
  ) {}

  private logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handle(): Promise<void> {
    this.logger.log('Iniciando a busca por lançamentos recentes!');
    await this.externalApiDataImporter.execute();
  }
}
