import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '../interfaces';
import { firstValueFrom } from 'rxjs';
import { LaunchDto } from 'src/modules/launches/dto';

@Injectable()
export class HttpAdapterService implements HttpService {
  constructor(private readonly axiosHttpService: AxiosHttpService) {}

  private logger = new Logger(HttpAdapterService.name);

  getData(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async getLatestData(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.axiosHttpService.get<LaunchDto>(
          ' https://api.spacexdata.com/v4/launches/latest',
        ),
      );
      this.logger.log(`Foi encontrado o lançamento ${response.data.id}`);
      return response.data;
    } catch (exception) {
      console.log('caiu', exception);
    }
  }
}
