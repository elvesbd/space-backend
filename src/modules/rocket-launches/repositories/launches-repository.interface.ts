import { ExternaLaunchDto } from 'src/modules/shared/infra/adapters/http/dto';
import { FiltersDto, LaunchesDto } from '../dto';
import { LaunchEntity } from '../entity';

export interface LaunchesRepository {
  getAllWithFilters(filtersDto?: FiltersDto): Promise<LaunchesDto>;
  countDocuments(query: Record<string, any>): Promise<number>;
  getAll(): Promise<LaunchEntity[]>;
  create(launches: ExternaLaunchDto[]): Promise<void>;
  saveLatestLaunch(launch: ExternaLaunchDto): Promise<void>;
}
