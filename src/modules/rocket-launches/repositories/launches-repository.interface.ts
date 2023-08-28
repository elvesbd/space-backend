import { FiltersDto, LaunchDto, LaunchesResponseDto } from '../dto';
import { CreateRocketLaunchDto } from '../application/domain/dtos';

export interface LaunchesRepository {
  getAllLaunchesWithFilters(
    filtersDto?: FiltersDto,
  ): Promise<LaunchesResponseDto>;
  countDocumentsByQuery(query: Record<string, any>): Promise<number>;
  getAllLaunches(): Promise<LaunchDto[]>;
  createLaunch(launch: CreateRocketLaunchDto): Promise<void>;
  saveLatestLaunch(launch: CreateRocketLaunchDto): Promise<void>;
}
