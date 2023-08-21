import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { YearlyRocketCountResponseDto } from '../../dto';
import { GetLaunchChartDataService } from '../../application/services';
import { LaunchesApiTag, LaunchesApiPath } from '../launches-api.constants';

@ApiTags(LaunchesApiTag)
@Controller(LaunchesApiPath)
export class GetLaunchesChartDataController {
  constructor(
    private readonly getLaunchChartDataService: GetLaunchChartDataService,
  ) {}

  @ApiOperation({ summary: 'get launches chart data' })
  @ApiOkResponse({ type: YearlyRocketCountResponseDto })
  @Get('stats/bar')
  async get(): Promise<YearlyRocketCountResponseDto> {
    return await this.getLaunchChartDataService.handle();
  }
}
