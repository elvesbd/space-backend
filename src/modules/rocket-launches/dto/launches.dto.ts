import { ApiProperty } from '@nestjs/swagger';
import { LaunchDto } from './launch.dto';

export class LaunchesDto {
  @ApiProperty({ type: [LaunchDto] })
  results: LaunchDto[];

  @ApiProperty()
  totalDocs: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  hasNext: boolean;

  @ApiProperty()
  hasPrev: boolean;
}
