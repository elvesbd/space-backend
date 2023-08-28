import { HttpService as AxiosHttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { RocketsHttpService } from '../../interfaces';
import { ExternalRocketDto } from '../dto';
import { baseUrl } from 'src/modules/shared/constants';

@Injectable()
export class HttpRocketsAdapterService implements RocketsHttpService {
  constructor(private readonly axiosHttpService: AxiosHttpService) {}

  private logger = new Logger(HttpRocketsAdapterService.name);

  /* async getRockets(rocketIds: string[]): Promise<string[]> {
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
  } */
  async getRocketNames(rocketIds: string[]): Promise<string[]> {
    try {
      const rocketNames: string[] = [];

      for (const id of rocketIds) {
        const response = this.axiosHttpService.get<ExternalRocketDto>(
          `${baseUrl}/rockets/${id}`,
        );
        const rockets = await firstValueFrom(response);
        const rocketName = rockets.data.name;
        rocketNames.push(rocketName);
      }

      return rocketNames;
    } catch (err) {
      const errorMessage = `Ocorreu um erro ao buscar os foguetes: ${err.message}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  async getRocketName(rocketId: string): Promise<string> {
    try {
      const response = this.axiosHttpService.get<ExternalRocketDto>(
        `${baseUrl}/rockets/${rocketId}`,
      );
      const rocket = await firstValueFrom(response);
      const rocketName = rocket.data.name;

      return rocketName;
    } catch (err) {
      const errorMessage = `Ocorreu um erro ao buscar o foguete: ${err.message}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }
}
