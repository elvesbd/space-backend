import { Controller, Get, Query } from '@nestjs/common';
import { FiltersDto, LaunchesResponseDto } from '../../dto';
import { OptionalParseIntPipe } from 'src/modules/shared/pipes';
import {
  ApiOperation,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { GetAllLaunchesService } from '../../application/services/get-all-launches';
import { LaunchesApiPath, LaunchesApiTag } from '../launches-api.constants';

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
    @Query('limit', OptionalParseIntPipe) limit: number,
    @Query('page', OptionalParseIntPipe) page: number,
  ): Promise<LaunchesResponseDto> {
    const filtersDto: FiltersDto = {
      search,
      limit,
      page,
    };
    return this.getAllLaunchesService.handle(filtersDto);
  }
}
