import { ApiProperty } from '@nestjs/swagger';

class RocketCounts {
  @ApiProperty()
  rocketId: string;

  @ApiProperty()
  launchTotal: number;
}

export class YearlyRocketCountsDto {
  @ApiProperty()
  year: number;

  @ApiProperty({ type: [RocketCounts] })
  rocketCounts: RocketCounts[];
}
