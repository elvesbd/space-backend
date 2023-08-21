import { ApiProperty } from '@nestjs/swagger';

class RocketCounts {
  @ApiProperty()
  rocket: string;

  @ApiProperty()
  launchTotal: number;
}

export class YearlyRocketCounts {
  @ApiProperty()
  year: number;

  @ApiProperty({ type: [RocketCounts] })
  rocketCounts: RocketCounts[];
}

export class YearlyRocketCountResponseDto {
  @ApiProperty({ type: [YearlyRocketCounts] })
  yearlyRocketCounts: YearlyRocketCounts[];
}
