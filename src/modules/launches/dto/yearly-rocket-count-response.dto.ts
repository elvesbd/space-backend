import { ApiProperty } from '@nestjs/swagger';

class RocketCounts {
  @ApiProperty()
  rocket: string;

  @ApiProperty()
  launchTotal: number;
}

export class YearlyRocketCountsDto {
  @ApiProperty()
  year: number;

  @ApiProperty({ type: [RocketCounts] })
  rocketCounts: RocketCounts[];
}

export class YearlyRocketCountResponseDto {
  @ApiProperty({ type: [YearlyRocketCountsDto] })
  yearlyRocketCounts: YearlyRocketCountsDto[];
}
