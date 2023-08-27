import { ApiProperty } from '@nestjs/swagger';

export class RocketLaunch {
  @ApiProperty()
  rocket: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  successCount: number;

  @ApiProperty()
  failureCount: number;
}

export class RocketLaunchResponseDto {
  @ApiProperty({ type: [RocketLaunch] })
  rocketLaunchCounts: RocketLaunch[];

  @ApiProperty()
  successRocketLaunches: number;

  @ApiProperty()
  failureRocketLaunches: number;
}
