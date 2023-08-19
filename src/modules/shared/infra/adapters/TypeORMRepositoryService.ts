import { Injectable } from '@nestjs/common';
import { FiltersDto, LaunchesResponseDto } from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';

@Injectable()
export class TypeORMRepositoryService implements LaunchesRepository {
  getAll(filters: FiltersDto): Promise<LaunchesResponseDto> {
    throw new Error('Method not implemented.');
  }
}
