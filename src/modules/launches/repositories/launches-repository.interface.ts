import { LaunchesResponseDto } from '../dto';

export interface LaunchesRepository {
  getAll(search?: string, limit?: number): Promise<LaunchesResponseDto>;
  create(dto: any): Promise<any>;
}
