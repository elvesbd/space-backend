import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { LaunchSummaryResponseDto } from '../../dto';
import { GetLaunchPieChartDataService } from '../../application/services';

@Controller('launches')
export class GetLaunchPieChartDataController {
  constructor(
    private readonly getLaunchPieChartDataService: GetLaunchPieChartDataService,
  ) {}

  @ApiOperation({ summary: 'get launch pie chart data' })
  @ApiOkResponse({ type: LaunchSummaryResponseDto })
  @Get('stats/pie')
  async get(): Promise<LaunchSummaryResponseDto> {
    return await this.getLaunchPieChartDataService.handle();
  }
}
