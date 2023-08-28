import { ApiProperty } from '@nestjs/swagger';

export class LaunchDto {
  @ApiProperty()
  launchId?: string;

  @ApiProperty()
  flightNumber: number;

  @ApiProperty()
  missionName: string;

  @ApiProperty()
  dateLaunch: string;

  @ApiProperty()
  rocketId: string;

  @ApiProperty()
  rocketName: string;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  youtubeLink: string;
}
