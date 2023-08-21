import { Inject, Injectable } from '@nestjs/common';
import { LaunchesRepository } from 'src/modules/launches/repositories';

@Injectable()
export class LaunchService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private launchRepository: LaunchesRepository,
  ) {}
}
