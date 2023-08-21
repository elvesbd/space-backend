import { Controller, Get } from '@nestjs/common';
import { HealthCheckResponseDto } from './dto';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class HealthCheckController {
  @ApiOperation({ summary: 'health check' })
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
