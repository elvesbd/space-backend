import { FiltersDto, LaunchDto, LaunchesResponseDto } from '../dto';

export interface LaunchesRepository {
  getAll(filtersDto?: FiltersDto): Promise<LaunchesResponseDto>;
  create(launches: LaunchDto[]): Promise<void>;
  saveLatestData(launch: LaunchDto): Promise<void>;
}
