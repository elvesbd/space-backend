import { Controller, Get } from '@nestjs/common';
import { HealthCheckResponseDto } from './dto';

@Controller()
export class HealthCheckController {
  @Get()
  check(): HealthCheckResponseDto {
    return {
      message: 'Fullstack Challenge 🏅 - Space X API',
    };
  }
}
