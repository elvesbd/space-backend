import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { readFileSync, writeFileSync } from 'fs';
import {
  ExternalApiDataImporter,
  PopulateInitialDataService,
} from 'src/modules/launches/application/domain';

@Injectable()
export class TaskService implements OnModuleInit {
  private configFilePath = 'config.json';
  private config = {};

  constructor(
    private readonly externalApiDataImporter: ExternalApiDataImporter,
    private readonly populateInitialDataService: PopulateInitialDataService,
  ) {}

  private logger = new Logger(TaskService.name);

  private loadConfig() {
    try {
      const data = readFileSync(this.configFilePath, 'utf-8');
      this.config = JSON.parse(data);
    } catch (error) {
      this.config = {};
    }
  }

  private saveConfig() {
    writeFileSync(this.configFilePath, JSON.stringify(this.config));
  }

  onModuleInit() {
    this.loadConfig();

    if (!this.config['taskExecuted']) {
      this.handlePopulate();
      this.config['taskExecuted'] = true;
      this.saveConfig();
    }
  }

  async handlePopulate(): Promise<void> {
    this.logger.log('Carregando dados iniciais para o banco!');
    await this.populateInitialDataService.execute();
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handle(): Promise<void> {
    this.logger.log('Iniciando a busca por lançamentos recentes!');
    await this.externalApiDataImporter.execute();
  }
}
