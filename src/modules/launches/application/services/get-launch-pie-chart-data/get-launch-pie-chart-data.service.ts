import { Inject, Injectable } from '@nestjs/common';
import {
  LaunchSummaryResponseDto,
  RocketLaunch,
} from 'src/modules/launches/dto';
import { LaunchEntity } from 'src/modules/launches/entity';
import { LaunchesRepository } from 'src/modules/launches/repositories';

@Injectable()
export class GetLaunchPieChartDataService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(): Promise<LaunchSummaryResponseDto> {
    const launches = await this.launchesRepository.getAll();

    const rocketCounts = this.calculateRocketCounts(launches);
    const totalRocketLaunches = this.calculateTotalRocketLaunches(rocketCounts);

    return {
      rocketLaunchCounts: Object.values(rocketCounts),
      totalRocketLaunches,
    };
  }

  private calculateRocketCounts(
    launches: LaunchEntity[],
  ): Record<string, RocketLaunch> {
    return launches.reduce((acc, launch) => {
      const { rocket, name } = launch;
      if (!acc[rocket]) {
        acc[rocket] = {
          rocket,
          name,
          launchesTotal: 0,
        };
      }

      acc[rocket].launchesTotal++;

      return acc;
    }, {} as Record<string, RocketLaunch>);
  }

  private calculateTotalRocketLaunches(
    rocketCounts: Record<string, RocketLaunch>,
  ): number {
    return Object.values(rocketCounts).reduce(
      (sum, { launchesTotal }) => sum + launchesTotal,
      0,
    );
  }
}
