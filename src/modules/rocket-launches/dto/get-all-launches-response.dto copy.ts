import { ApiProperty } from '@nestjs/swagger';
import { MapLaunchesWithRocketNamesDto } from './map-launches-with-rocket-names.dto';

export class GetAllLaunchesResponseDto {
  @ApiProperty({ type: [MapLaunchesWithRocketNamesDto] })
  results: MapLaunchesWithRocketNamesDto[];

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
