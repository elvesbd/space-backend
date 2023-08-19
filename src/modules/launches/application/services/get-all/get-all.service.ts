import { Inject, Injectable } from '@nestjs/common';
import { FiltersDto, LaunchesResponseDto } from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';

@Injectable()
export class GetAllService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async execute(filtersDto: FiltersDto): Promise<LaunchesResponseDto> {
    return await this.launchesRepository.getAll(filtersDto);
  }

  async create(dto: any): Promise<any> {
    return await this.launchesRepository.create(dto);
  }
}
