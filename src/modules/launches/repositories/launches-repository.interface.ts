import { FiltersDto, LaunchDto, LaunchesResponseDto } from '../dto';

export interface LaunchesRepository {
  getAll(filtersDto?: FiltersDto): Promise<LaunchesResponseDto>;
  save(dto: any): Promise<void>;
  saveLatestData(launch: LaunchDto): Promise<void>;
}
