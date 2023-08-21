import { ApiProperty } from '@nestjs/swagger';

export class RocketLaunch {
  @ApiProperty()
  rocket: string;

  @ApiProperty()
  successCount: number;

  @ApiProperty()
  failureCount: number;
}

export class LaunchSummaryResponseDto {
  @ApiProperty({ type: [RocketLaunch] })
  rocketLaunchCounts: RocketLaunch[];

  @ApiProperty()
  totalSuccessCount: number;

  @ApiProperty()
  totalFailureCount: number;
}
