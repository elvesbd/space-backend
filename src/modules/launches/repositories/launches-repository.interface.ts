import { FiltersDto, LaunchesResponseDto } from '../dto';

export interface LaunchesRepository {
  getAll(filtersDto?: FiltersDto): Promise<LaunchesResponseDto>;
  create(dto: any): Promise<any>;
}
