import { Inject, Injectable } from '@nestjs/common';
import { YearlyRocketCountResponseDto } from 'src/modules/launches/dto';
import { LaunchEntity } from 'src/modules/launches/entity';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { RocketTotalCount, YearlyRocketCounts } from '../../interfaces';

@Injectable()
export class GetLaunchChartDataService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(): Promise<YearlyRocketCountResponseDto> {
    const launches = await this.launchesRepository.getAll();
    const yearlyCountsMap = this.calculateYearlyCounts(launches);
    return {
      yearlyRocketCounts: [...yearlyCountsMap.values()],
    };
  }

  private calculateYearlyCounts(
    launches: LaunchEntity[],
  ): Map<number, YearlyRocketCounts> {
    const yearlyCountsMap: Map<number, YearlyRocketCounts> = new Map();

    for (const launch of launches) {
      const { launchYear, rocketId } = this.extractLaunchInfo(launch);

      if (!yearlyCountsMap.has(launchYear)) {
        yearlyCountsMap.set(launchYear, {
          year: launchYear,
          rocketCounts: [],
        });
      }

      const rocketCounts = this.findOrCreateRocketCounts(
        yearlyCountsMap.get(launchYear),
        rocketId,
      );
      rocketCounts.launchTotal++;
    }

    return yearlyCountsMap;
  }

  private extractLaunchInfo(launch: LaunchEntity): {
    launchYear: number;
    rocketId: string;
  } {
    const launchDate = new Date(launch.dateUtc);
    return {
      launchYear: launchDate.getFullYear(),
      rocketId: launch.rocket,
    };
  }

  private findOrCreateRocketCounts(
    yearlyCounts: YearlyRocketCounts,
    rocketId: string,
  ): RocketTotalCount {
    let rocketCounts = yearlyCounts.rocketCounts.find(
      (item) => item.rocket === rocketId,
    );

    if (!rocketCounts) {
      rocketCounts = {
        rocket: rocketId,
        launchTotal: 0,
      };
      yearlyCounts.rocketCounts.push(rocketCounts);
    }

    return rocketCounts;
  }
}
