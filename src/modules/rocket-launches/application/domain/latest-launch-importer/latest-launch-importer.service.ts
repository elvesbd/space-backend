import { Inject, Injectable } from '@nestjs/common';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';
import { LaunchesHttpService } from 'src/modules/shared/infra/adapters/interfaces';

@Injectable()
export class LatestLaunchImporter {
  constructor(
    @Inject('LAUNCHES_HTTP_SERVICE')
    private readonly httpService: LaunchesHttpService,
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(): Promise<void> {
    const latestLaunch = await this.httpService.getLatestData();
    await this.launchesRepository.saveLatestLaunch(latestLaunch);
  }
}
