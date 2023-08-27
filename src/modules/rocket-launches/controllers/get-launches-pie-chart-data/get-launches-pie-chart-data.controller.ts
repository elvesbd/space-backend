import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RocketLaunchResponseDto } from '../../dto';
import { GetLaunchPieChartDataService } from '../../application/services';
import { LaunchesApiTag, LaunchesApiPath } from '../launches-api.constants';

@ApiTags(LaunchesApiTag)
@Controller(LaunchesApiPath)
export class GetLaunchesPieChartDataController {
  constructor(
    private readonly getLaunchPieChartDataService: GetLaunchPieChartDataService,
  ) {}

  @ApiOperation({ summary: 'get launch pie chart data' })
  @ApiOkResponse({ type: RocketLaunchResponseDto })
  @Get('stats/pie')
  async get(): Promise<RocketLaunchResponseDto> {
    return await this.getLaunchPieChartDataService.handle();
  }
}
