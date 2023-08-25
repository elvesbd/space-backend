import { ExternaLaunchDto } from '../http/dto';

export interface LaunchesHttpService {
  getLatestData(): Promise<ExternaLaunchDto>;
  getData(): Promise<ExternaLaunchDto[]>;
}
