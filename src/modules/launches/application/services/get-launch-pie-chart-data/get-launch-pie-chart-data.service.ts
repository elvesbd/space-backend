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

    const rocketCounts: { [rocketId: string]: RocketLaunch } = launches.reduce(
      (acc, launch) => {
        const rocketId = launch.rocket;
        if (!acc[rocketId]) {
          acc[rocketId] = {
            rocket: rocketId,
            successCount: 0,
            failureCount: 0,
          };
        }

        if (launch.success) {
          acc[rocketId].successCount++;
        } else {
          acc[rocketId].failureCount++;
        }

        return acc;
      },
      {},
    );

    const totalSuccessCount = Object.values(rocketCounts).reduce(
      (sum, counts) => sum + counts.successCount,
      0,
    );

    const totalFailureCount = Object.values(rocketCounts).reduce(
      (sum, counts) => sum + counts.failureCount,
      0,
    );

    return {
      rocketLaunchCounts: Object.values(rocketCounts),
      totalSuccessCount,
      totalFailureCount,
    };
  }
}
