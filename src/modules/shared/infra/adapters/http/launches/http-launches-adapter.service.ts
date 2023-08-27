import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { LaunchesHttpService } from '../../interfaces';
import { ExternaLaunchDto } from '../dto';
import { baseUrl } from 'src/modules/shared/constants';

@Injectable()
export class HttpLaunchesAdapterService implements LaunchesHttpService {
  constructor(private readonly axiosHttpService: AxiosHttpService) {}

  private logger = new Logger(HttpLaunchesAdapterService.name);

  async getData(): Promise<ExternaLaunchDto[]> {
    try {
      const { data: launches } = await firstValueFrom(
        this.axiosHttpService.get<ExternaLaunchDto[]>(`${baseUrl}`),
      );
      return launches;
    } catch (err) {
      this.logger.error('An error occurred while fetching launches', err.stack);
    }
  }

  async getLatestData(): Promise<ExternaLaunchDto> {
    try {
      const { data: launch } = await firstValueFrom(
        this.axiosHttpService.get<ExternaLaunchDto>(`${baseUrl}/latest`),
      );
      this.logger.log(`Foi encontrado o lançamento ${launch.id}`);
      return launch;
    } catch (err) {
      this.logger.error('An error occurred while fetching launch', err.stack);
    }
  }
}
