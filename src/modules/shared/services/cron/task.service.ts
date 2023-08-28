import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { readFileSync, writeFileSync } from 'fs';
import {
  LatestLaunchImporter,
  PopulateInitialDataService,
} from 'src/modules/rocket-launches/application/domain';

@Injectable()
export class TaskService implements OnModuleInit {
  private configFilePath = 'config.json';
  private config = {};

  constructor(
    private readonly latestLaunchImporter: LatestLaunchImporter,
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
    try {
      this.logger.log('Carregando dados iniciais para o banco!');
      await this.populateInitialDataService.handle();
    } catch (error) {
      this.logger.error('Error populating initial data:', error.message);
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async handle(): Promise<void> {
    try {
      this.logger.log('Iniciando a busca por lançamentos recentes!');
      await this.latestLaunchImporter.handle();
    } catch (error) {
      this.logger.error('Error importing latest launches:', error.message);
    }
  }
}
