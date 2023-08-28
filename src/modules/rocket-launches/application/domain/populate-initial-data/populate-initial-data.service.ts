import { Inject, Injectable } from '@nestjs/common';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';
import { ExternaLaunchDto } from 'src/modules/shared/infra/adapters/http/dto';
import {
  LaunchesHttpService,
  RocketsHttpService,
} from 'src/modules/shared/infra/adapters/interfaces';
import { PopulateInitialDataMapper } from './mapper/populate-initial-data.mapper';

@Injectable()
export class PopulateInitialDataService {
  constructor(
    @Inject('LAUNCHES_HTTP_SERVICE')
    private readonly httpService: LaunchesHttpService,
    @Inject('ROCKETS_HTTP_SERVICE')
    private readonly rocketsHttpService: RocketsHttpService,
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(): Promise<void> {
    const launches: ExternaLaunchDto[] = await this.httpService.getData();
    const rocketIds = launches.map((item) => item.rocket);
    const rocketNames = await this.rocketsHttpService.getRocketNames(rocketIds);

    const mappedLaunches = PopulateInitialDataMapper.toPersistence(
      launches,
      rocketNames,
    );

    const createPromises = mappedLaunches.map(async (launch) => {
      await this.launchesRepository.createLaunch(launch);
    });

    await Promise.all(createPromises);
  }
}
