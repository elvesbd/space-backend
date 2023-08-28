import { Inject, Injectable } from '@nestjs/common';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';
import {
  LaunchesHttpService,
  RocketsHttpService,
} from 'src/modules/shared/infra/adapters/interfaces';
import { LatestLaunchImporterMapper } from './mapper/latest-launch-importer.mapper';

@Injectable()
export class LatestLaunchImporter {
  constructor(
    @Inject('LAUNCHES_HTTP_SERVICE')
    private readonly launchesHttpService: LaunchesHttpService,
    @Inject('ROCKETS_HTTP_SERVICE')
    private readonly rocketsHttpService: RocketsHttpService,
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(): Promise<void> {
    const latestLaunch = await this.launchesHttpService.getLatestData();
    const rocketName = await this.rocketsHttpService.getRocketName(
      latestLaunch.rocket,
    );

    const mappedLatestLaunch = LatestLaunchImporterMapper.toPersistence(
      latestLaunch,
      rocketName,
    );
    await this.launchesRepository.saveLatestLaunch(mappedLatestLaunch);
  }
}
