import { Inject, Injectable } from '@nestjs/common';
import {
  RocketLaunchResponseDto,
  RocketLaunch,
} from 'src/modules/rocket-launches/dto';
import { LaunchEntity } from 'src/modules/rocket-launches/entity';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';

@Injectable()
export class GetLaunchPieChartDataService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(): Promise<RocketLaunchResponseDto> {
    const launches = await this.launchesRepository.getAll();

    const rocketCounts = this.calculateRocketCounts(launches);
    const successRocketLaunches =
      this.calculateSuccessRocketLaunches(rocketCounts);

    const failureRocketLaunches =
      this.calculateFailureRocketLaunches(rocketCounts);

    return {
      rocketLaunchCounts: Object.values(rocketCounts),
      successRocketLaunches,
      failureRocketLaunches,
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
          successCount: 0,
          failureCount: 0,
        };
      }

      if (launch.success) {
        acc[rocket].successCount++;
      } else {
        acc[rocket].failureCount++;
      }

      return acc;
    }, {} as Record<string, RocketLaunch>);
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
