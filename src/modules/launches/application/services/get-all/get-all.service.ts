import { Injectable } from '@nestjs/common';
import { FiltersDto, LaunchesResponseDto } from 'src/modules/launches/dto';

@Injectable()
export class GetAllService {
  execute(filters: FiltersDto): Promise<LaunchesResponseDto> {
    return null;
  }
}
