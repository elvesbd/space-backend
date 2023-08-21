import { ExternaLaunchDto } from 'src/modules/shared/infra/adapters/http/dto';
import { FiltersDto, LaunchesResponseDto } from '../dto';
import { Launch } from 'src/modules/shared/infra/adapters/mongo/schemas';

export interface LaunchesRepository {
  getAllByFilters(filtersDto?: FiltersDto): Promise<LaunchesResponseDto>;
  getAll(): Promise<Launch[]>;
  create(launches: ExternaLaunchDto[]): Promise<void>;
  saveLatestData(launch: ExternaLaunchDto): Promise<void>;
}
