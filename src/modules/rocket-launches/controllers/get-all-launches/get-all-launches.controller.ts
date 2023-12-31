import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { GetAllLaunchesService } from '../../application/services/get-all-launches';
import { LaunchesApiPath, LaunchesApiTag } from '../launches-api.constants';
import { FiltersDto, LaunchesResponseDto } from '../../dto';

@ApiTags(LaunchesApiTag)
@Controller(LaunchesApiPath)
export class GetAllLaunchesController {
  constructor(private readonly getAllLaunchesService: GetAllLaunchesService) {}

  @ApiOperation({ summary: 'get all launches' })
  @ApiOkResponse({ type: [LaunchesResponseDto] })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get()
  get(
    @Query('search') search: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
  ): Promise<LaunchesResponseDto> {
    const filtersDto: FiltersDto = {
      search,
      limit,
      page,
    };
    return this.getAllLaunchesService.handle(filtersDto);
  }
}
