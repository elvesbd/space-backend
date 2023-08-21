import { ExternaLaunchDto } from 'src/modules/shared/infra/adapters/http/dto';
import { FiltersDto, LaunchesResponseDto } from '../dto';

export interface LaunchesRepository {
  getAll(filtersDto?: FiltersDto): Promise<LaunchesResponseDto>;
  create(launches: ExternaLaunchDto[]): Promise<void>;
  saveLatestData(launch: ExternaLaunchDto): Promise<void>;
}
