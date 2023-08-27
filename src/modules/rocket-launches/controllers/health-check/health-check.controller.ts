import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheckResponseDto } from './dto';

@ApiTags('Health Check')
@Controller()
export class HealthCheckController {
  @ApiOkResponse({
    type: HealthCheckResponseDto,
  })
  @Get()
  check(): HealthCheckResponseDto {
    return {
      message: 'Fullstack Challenge 🏅 - Space X API',
    };
  }
}
