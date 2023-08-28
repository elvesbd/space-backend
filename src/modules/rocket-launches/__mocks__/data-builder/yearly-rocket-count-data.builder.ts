import { YearlyRocketCountsDto } from '../../dto';

export class YearlyRocketCountsDataBuilder {
  private yearlyRocketCountsDto: YearlyRocketCountsDto = {
    year: 2022,
    rocketCounts: [
      {
        rocketId: '5e9d0d95eda69973a809d1ec',
        launchTotal: 1,
      },
    ],
  };

  static aYearlyRocketCounts(): YearlyRocketCountsDataBuilder {
    return new YearlyRocketCountsDataBuilder();
  }

  build(): YearlyRocketCountsDto {
    return this.yearlyRocketCountsDto;
  }
}
