import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { GetLaunchChartDataService } from '../../application/services';
import { YearlyRocketCountResponseDto } from '../../dto';

@Controller('launches')
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
