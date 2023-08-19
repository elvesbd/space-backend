import { FiltersDto, LaunchesResponseDto } from '../dto';

export interface LaunchesRepository {
  getAll(filters: FiltersDto): Promise<LaunchesResponseDto>;
}
