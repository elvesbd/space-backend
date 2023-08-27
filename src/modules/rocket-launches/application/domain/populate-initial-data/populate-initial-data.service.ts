import { Inject, Injectable } from '@nestjs/common';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';
import { ExternaLaunchDto } from 'src/modules/shared/infra/adapters/http/dto';
import { LaunchesHttpService } from 'src/modules/shared/infra/adapters/interfaces';

@Injectable()
export class PopulateInitialDataService {
  constructor(
    @Inject('LAUNCHES_HTTP_SERVICE')
    private readonly httpService: LaunchesHttpService,
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async execute(): Promise<void> {
    const launches: ExternaLaunchDto[] = await this.httpService.getData();
    await this.launchesRepository.create(launches);
  }
}
