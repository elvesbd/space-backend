import { LaunchDto } from 'src/modules/launches/dto';

export interface HttpService {
  getLatestData(): Promise<LaunchDto>;
  getData(): Promise<LaunchDto[]>;
}
