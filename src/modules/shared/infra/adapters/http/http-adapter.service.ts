import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../interfaces';
import { firstValueFrom } from 'rxjs';
import { LaunchDto } from 'src/modules/launches/dto';

@Injectable()
export class HttpAdapterService implements HttpService {
  constructor(private readonly axiosHttpService: AxiosHttpService) {}

  private logger = new Logger(HttpAdapterService.name);

  async getData(): Promise<LaunchDto[]> {
    try {
      const { data: launches } = await firstValueFrom(
        this.axiosHttpService.get<LaunchDto[]>(
          ' https://api.spacexdata.com/v4/launches',
        ),
      );
      return launches;
    } catch (err) {
      this.logger.error('An error occurred while fetching launches', err.stack);
    }
  }

  async getLatestData(): Promise<LaunchDto> {
    try {
      const { data: launch } = await firstValueFrom(
        this.axiosHttpService.get<LaunchDto>(
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
