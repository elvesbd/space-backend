import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { FiltersDto, LaunchesResponseDto } from '../../dto';
import { GetAllService } from '../../application/services/get-all';

@Controller()
export class GetAllController {
  constructor(private readonly getAllService: GetAllService) {}

  @Get('launches')
  getAll(
    @Query('search') search: string,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<LaunchesResponseDto> {
    const filters: FiltersDto = { search, limit };
    return this.getAllService.execute(filters);
  }
}
