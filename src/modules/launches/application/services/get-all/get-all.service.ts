import { Inject, Injectable } from '@nestjs/common';
import { FiltersDto, LaunchesResponseDto } from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';

@Injectable()
export class GetAllService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  execute(filters: FiltersDto): Promise<LaunchesResponseDto> {
    return this.launchesRepository.getAll(filters);
  }
}
