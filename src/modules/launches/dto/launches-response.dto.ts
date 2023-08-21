import { ApiProperty } from '@nestjs/swagger';
import { LaunchDto } from './launche.dto';

export class LaunchesResponseDto {
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
