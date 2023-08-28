import { Inject, Injectable } from '@nestjs/common';
import {
  FiltersDto,
  LaunchesResponseDto,
} from 'src/modules/rocket-launches/dto';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';

@Injectable()
export class GetAllLaunchesService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(filtersDto: FiltersDto): Promise<LaunchesResponseDto> {
    return await this.launchesRepository.getAllLaunchesWithFilters(filtersDto);
  }
}
