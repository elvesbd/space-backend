import { Controller, Get, Query } from '@nestjs/common';
import { FiltersDto, LaunchesResponseDto } from '../../dto';
import { GetAllService } from '../../application/services/get-all';
import { OptionalParseIntPipe } from 'src/modules/shared/pipes';
import { ApiOperation, ApiOkResponse, ApiQuery } from '@nestjs/swagger';

@Controller()
export class GetAllController {
  constructor(private readonly getAllService: GetAllService) {}

  @ApiOperation({ summary: 'find all all launches' })
  @ApiOkResponse({ type: [LaunchesResponseDto] })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get('launches')
  getAll(
    @Query('search') search: string,
    @Query('limit', OptionalParseIntPipe) limit: number,
    @Query('page', OptionalParseIntPipe) page: number,
  ): Promise<LaunchesResponseDto> {
    const filtersDto: FiltersDto = {
      search,
      limit,
      page,
    };
    return this.getAllService.execute(filtersDto);
  }
}
