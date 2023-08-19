import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HttpService } from '../interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HttpAdapterService implements HttpService {
  constructor(private readonly axiosHttpService: AxiosHttpService) {}

  async getDataFromExternalAPI(): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.axiosHttpService.get(' https://api.spacexdata.com/v4/launches '),
      );
      return response.data;
    } catch (exception) {
      console.log('caiu', exception);
    }
  }
}
