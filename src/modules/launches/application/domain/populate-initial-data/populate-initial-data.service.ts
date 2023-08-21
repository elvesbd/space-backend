import { Inject, Injectable } from '@nestjs/common';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { ExternaLaunchDto } from 'src/modules/shared/infra/adapters/http/dto';
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
    const launches: ExternaLaunchDto[] = await this.httpService.getData();
    await this.launchesRepository.create(launches);
  }
}
