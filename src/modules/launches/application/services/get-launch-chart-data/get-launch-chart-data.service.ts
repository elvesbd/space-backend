import { Inject, Injectable } from '@nestjs/common';
import { LaunchEntity } from 'src/modules/launches/entity';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { RocketTotalCount, YearlyRocketCounts } from '../../interfaces';
import { YearlyRocketCountsDto } from 'src/modules/launches/dto';

@Injectable()
export class GetLaunchChartDataService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(): Promise<YearlyRocketCountsDto[]> {
    const launches = await this.launchesRepository.getAll();
    return this.calculateYearlyCounts(launches);
  }

  private calculateYearlyCounts(
    launches: LaunchEntity[],
  ): YearlyRocketCountsDto[] {
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

    return Array.from(yearlyCountsMap.values());
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
