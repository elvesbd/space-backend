import { FiltersDto, LaunchesResponseDto } from '../dto';

export interface LaunchesRepository {
  getAll(filtersDto?: FiltersDto): Promise<LaunchesResponseDto>;
  save(dto: any): Promise<any>;
}
