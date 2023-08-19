import { Inject, Injectable } from '@nestjs/common';
import { LaunchesRepository } from '../../repositories';
import { HttpService } from 'src/modules/shared/infra/adapters/interfaces';

@Injectable()
export class ExternalApiDataImporter {
  constructor(
    @Inject('HTTP_SERVICE')
    private readonly httpService: HttpService,
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async execute(): Promise<void> {
    const externalData = await this.httpService.getDataFromExternalAPI();
    await this.launchesRepository.save(externalData);
  }
}
