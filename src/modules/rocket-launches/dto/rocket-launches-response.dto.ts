import { ApiProperty } from '@nestjs/swagger';

export class RocketLaunch {
  @ApiProperty()
  rocketId: string;

  @ApiProperty()
  rocketName: string;

  @ApiProperty()
  successCount: number;

  @ApiProperty()
  failureCount: number;
}

export class RocketLaunchResponseDto {
  @ApiProperty({ type: [RocketLaunch] })
  rocketLaunchCounts: RocketLaunch[];

  @ApiProperty()
  successCount: number;

  @ApiProperty()
  failureCount: number;
}
