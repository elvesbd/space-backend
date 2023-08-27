import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { YearlyRocketCountsDto } from '../../dto';
import { GetLaunchChartDataService } from '../../application/services';
import { LaunchesApiTag, LaunchesApiPath } from '../launches-api.constants';

@ApiTags(LaunchesApiTag)
@Controller(LaunchesApiPath)
export class GetLaunchesChartDataController {
  constructor(
    private readonly getLaunchChartDataService: GetLaunchChartDataService,
  ) {}

  @ApiOperation({ summary: 'get launches chart data' })
  @ApiOkResponse({ type: [YearlyRocketCountsDto] })
  @Get('stats/bar')
  async get(): Promise<YearlyRocketCountsDto[]> {
    return await this.getLaunchChartDataService.handle();
  }
}
