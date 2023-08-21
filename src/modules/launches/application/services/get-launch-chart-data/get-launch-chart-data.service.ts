import { Inject, Injectable } from '@nestjs/common';
import { YearlyRocketCountResponseDto } from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';

interface RocketTotalCount {
  rocket: string;
  launchTotal: number;
}

interface YearlyRocketCounts {
  year: number;
  rocketCounts: RocketTotalCount[];
}

@Injectable()
export class GetLaunchChartDataService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(): Promise<YearlyRocketCountResponseDto> {
    const launches = await this.launchesRepository.getAll();
    const yearlyCountsMap: Map<number, YearlyRocketCounts> = new Map();

    for (const launch of launches) {
      const launchDate = new Date(launch.dateUtc);
      const launchYear = launchDate.getFullYear();
      const rocketId = launch.rocket;

      let yearCounts = yearlyCountsMap.get(launchYear);
      if (!yearCounts) {
        yearCounts = {
          year: launchYear,
          rocketCounts: [],
        };
        yearlyCountsMap.set(launchYear, yearCounts);
      }

      let rocketCounts = yearCounts.rocketCounts.find(
        (item) => item.rocket === rocketId,
      );
      if (!rocketCounts) {
        rocketCounts = {
          rocket: rocketId,
          launchTotal: 0,
        };
        yearCounts.rocketCounts.push(rocketCounts);
      }

      rocketCounts.launchTotal++;
    }

    return {
      yearlyRocketCounts: [...yearlyCountsMap.values()],
    };
  }
}
