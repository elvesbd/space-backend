import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../interfaces';
import { firstValueFrom } from 'rxjs';
import { ExternaLaunchDto } from './dto';

@Injectable()
export class HttpSpaceXAdapterService implements HttpService {
  constructor(private readonly axiosHttpService: AxiosHttpService) {}

  private logger = new Logger(HttpSpaceXAdapterService.name);

  async getData(): Promise<ExternaLaunchDto[]> {
    try {
      const { data: launches } = await firstValueFrom(
        this.axiosHttpService.get<ExternaLaunchDto[]>(
          ' https://api.spacexdata.com/v4/launches',
        ),
      );
      return launches;
    } catch (err) {
      this.logger.error('An error occurred while fetching launches', err.stack);
    }
  }

  async getLatestData(): Promise<ExternaLaunchDto> {
    try {
      const { data: launch } = await firstValueFrom(
        this.axiosHttpService.get<ExternaLaunchDto>(
          ' https://api.spacexdata.com/v4/launches/latest',
        ),
      );
      this.logger.log(`Foi encontrado o lançamento ${launch.id}`);
      return launch;
    } catch (err) {
      this.logger.error('An error occurred while fetching launch', err.stack);
    }
  }
}
