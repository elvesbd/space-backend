import { Inject, Injectable } from '@nestjs/common';
import { LaunchDto } from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { HttpService } from 'src/modules/shared/infra/adapters/interfaces';

@Injectable()
export class PopulateInitialDataService {
  constructor(
    @Inject('HTTP_SERVICE')
    private readonly httpService: HttpService,
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async execute(): Promise<void> {
    const externalData: LaunchDto[] = await this.httpService.getData();
    await this.launchesRepository.create(externalData);
  }
}
