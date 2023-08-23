import { Inject, Injectable } from '@nestjs/common';
import {
  LaunchSummaryResponseDto,
  RocketLaunch,
} from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';

@Injectable()
export class GetLaunchPieChartDataService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(): Promise<LaunchSummaryResponseDto> {
    const launches = await this.launchesRepository.getAll();

    const rocketCounts: Record<string, RocketLaunch> = launches.reduce(
      (acc, launch) => {
        const rocketId = launch.rocket;
        if (!acc[rocketId]) {
          acc[rocketId] = {
            rocket: rocketId,
            name: launch.name,
            launchesTotal: 0,
          };
        }

        acc[rocketId].launchesTotal++;

        return acc;
      },
      {} as Record<string, RocketLaunch>,
    );

    const totalRocketLaunches = Object.values(rocketCounts).reduce(
      (sum, counts) => sum + counts.launchesTotal,
      0,
    );

    return {
      rocketLaunchCounts: Object.values(rocketCounts),
      totalRocketLaunches,
    };
  }
}
