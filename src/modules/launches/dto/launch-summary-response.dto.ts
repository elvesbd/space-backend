import { ApiProperty } from '@nestjs/swagger';

export class RocketLaunch {
  @ApiProperty()
  rocket: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  launchesTotal: number;
}

export class LaunchSummaryResponseDto {
  @ApiProperty({ type: [RocketLaunch] })
  rocketLaunchCounts: RocketLaunch[];

  @ApiProperty()
  totalRocketLaunches: number;
}
