import { ExternaLaunchDto } from '../http/dto';

export interface HttpService {
  getLatestData(): Promise<ExternaLaunchDto>;
  getData(): Promise<ExternaLaunchDto[]>;
}
