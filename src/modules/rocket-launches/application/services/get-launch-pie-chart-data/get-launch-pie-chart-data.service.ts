import { Inject, Injectable } from '@nestjs/common';
import {
  RocketLaunchResponseDto,
  RocketLaunch,
  LaunchDto,
} from 'src/modules/rocket-launches/dto';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';

@Injectable()
export class GetLaunchPieChartDataService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(): Promise<RocketLaunchResponseDto> {
    const launches = await this.launchesRepository.getAllLaunches();

    const rocketCounts = this.calculateRocketCounts(launches);
    const successCount = this.calculateSuccessRocketLaunches(rocketCounts);
    const failureCount = this.calculateFailureRocketLaunches(rocketCounts);

    return {
      rocketLaunchCounts: Object.values(rocketCounts),
      successCount,
      failureCount,
    };
  }

  private calculateRocketCounts(
    launches: LaunchDto[],
  ): Record<string, RocketLaunch> {
    const rocketCounts: Record<string, RocketLaunch> = {};

    for (const launch of launches) {
      const { rocketName, rocketId } = launch;

      if (!rocketCounts[rocketName]) {
        rocketCounts[rocketName] = {
          rocketId,
          rocketName,
          successCount: 0,
          failureCount: 0,
        };
      }

      if (launch.success) {
        rocketCounts[rocketName].successCount++;
      } else {
        rocketCounts[rocketName].failureCount++;
      }
    }

    return rocketCounts;
  }

  private calculateSuccessRocketLaunches(
    rocketCounts: Record<string, RocketLaunch>,
  ): number {
    return Object.values(rocketCounts).reduce(
      (sum, { successCount }) => sum + successCount,
      0,
    );
  }

  private calculateFailureRocketLaunches(
    rocketCounts: Record<string, RocketLaunch>,
  ): number {
    return Object.values(rocketCounts).reduce(
      (sum, { failureCount }) => sum + failureCount,
      0,
    );
  }
}
