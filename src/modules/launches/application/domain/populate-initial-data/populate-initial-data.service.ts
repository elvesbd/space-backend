import { Inject, Injectable } from '@nestjs/common';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { HttpService } from 'src/modules/shared/infra/adapters/interfaces';
import { Launch } from 'src/modules/shared/infra/adapters/mongo/schemas';

@Injectable()
export class PopulateInitialDataService {
  constructor(
    @Inject('HTTP_SERVICE')
    private readonly httpService: HttpService,
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async execute(): Promise<void> {
    const externalData: Launch[] = await this.httpService.getData();
    await this.launchesRepository.save(externalData);
  }
}
