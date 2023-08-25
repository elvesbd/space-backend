import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { GetAllLaunchesService } from '../../application/services/get-all-launches';
import { LaunchesApiPath, LaunchesApiTag } from '../launches-api.constants';
import { GetAllLaunchesResponseDto } from '../../dto/get-all-launches-response.dto copy';
import { OptionalParseIntPipe } from 'src/modules/shared/pipes';
import { FiltersDto } from '../../dto';

@ApiTags(LaunchesApiTag)
@Controller(LaunchesApiPath)
export class GetAllLaunchesController {
  constructor(private readonly getAllLaunchesService: GetAllLaunchesService) {}

  @ApiOperation({ summary: 'get all launches' })
  @ApiOkResponse({ type: [GetAllLaunchesResponseDto] })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @Get()
  get(
    @Query('search') search: string,
    @Query('limit', OptionalParseIntPipe) limit: number,
    @Query('page', OptionalParseIntPipe) page: number,
  ): Promise<GetAllLaunchesResponseDto> {
    console.log('search', search);
    const filtersDto: FiltersDto = {
      search,
      limit,
      page,
    };
    return this.getAllLaunchesService.handle(filtersDto);
  }
}
