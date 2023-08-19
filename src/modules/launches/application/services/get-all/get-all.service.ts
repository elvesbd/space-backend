import { Inject, Injectable } from '@nestjs/common';
import { LaunchesResponseDto } from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';

@Injectable()
export class GetAllService {
  constructor(
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async execute(search?: string, limit?: number): Promise<LaunchesResponseDto> {
    return await this.launchesRepository.getAll(search, limit);
  }
}
