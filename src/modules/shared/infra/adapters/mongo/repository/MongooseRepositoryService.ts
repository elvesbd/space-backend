import { Injectable } from '@nestjs/common';
import { LaunchesResponseDto } from 'src/modules/launches/dto';
import { LaunchesRepository } from 'src/modules/launches/repositories';

@Injectable()
export class MongooseRepositoryService implements LaunchesRepository {
  getAll(search?: string, limit?: number): Promise<LaunchesResponseDto> {
    throw new Error('Method not implemented.');
  }
}
