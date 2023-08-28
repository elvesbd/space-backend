import { RocketLaunchResponseDto } from '../../dto';

export class RocketPieChartDataBuilder {
  private rocketLaunchResponseDto: RocketLaunchResponseDto = {
    rocketLaunchCounts: [
      {
        rocketId: '5e9d0d95eda69973a809d1ec',
        rocketName: 'Falcon 9',
        successCount: 1,
        failureCount: 0,
      },
    ],
    successCount: 1,
    failureCount: 0,
  };

  static aRocketPieChartData(): RocketPieChartDataBuilder {
    return new RocketPieChartDataBuilder();
  }

  build(): RocketLaunchResponseDto {
    return this.rocketLaunchResponseDto;
  }
}
