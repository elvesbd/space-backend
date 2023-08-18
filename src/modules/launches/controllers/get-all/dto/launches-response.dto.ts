import { LaunchDto } from './launche.dto';

export class LaunchesResponseDto {
  results: LaunchDto[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
