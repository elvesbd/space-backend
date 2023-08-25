import { Inject, Injectable } from '@nestjs/common';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { LaunchesHttpService } from 'src/modules/shared/infra/adapters/interfaces';

@Injectable()
export class ExternalApiDataImporter {
  constructor(
    @Inject('LAUNCHES_HTTP_SERVICE')
    private readonly httpService: LaunchesHttpService,
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async execute(): Promise<void> {
    const launch = await this.httpService.getLatestData();
    await this.launchesRepository.saveLatestLaunch(launch);
  }
}
