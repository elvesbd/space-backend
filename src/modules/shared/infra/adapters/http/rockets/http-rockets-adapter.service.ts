import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom, from } from 'rxjs';
import { RocketsHttpService } from '../../interfaces';
import { ExternalRocketDto } from '../dto';
import { baseUrl } from 'src/modules/shared/constants';

@Injectable()
export class HttpRocketsAdapterService implements RocketsHttpService {
  constructor(private readonly axiosHttpService: AxiosHttpService) {}

  private logger = new Logger(HttpRocketsAdapterService.name);

  async getRockets(rocketIds: string[]): Promise<string[]> {
    try {
      const rocketNamesPromises = rocketIds.map(async (id) => {
        const response$ = this.axiosHttpService.get<ExternalRocketDto>(
          `${baseUrl}/rockets/${id}`,
        );
        const { data } = await firstValueFrom(response$);
        return data.name;
      });

      const rocketNames$ = from(Promise.all(rocketNamesPromises));
      const rocketNames = await firstValueFrom(rocketNames$);

      return rocketNames;
    } catch (err) {
      this.logger.error(
        'An error occurred while fetching rockets',
        err.message,
      );
      throw err;
    }
  }
}
