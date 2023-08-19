import { Controller, Get } from '@nestjs/common';
import { LaunchesResponseDto } from '../../dto';

@Controller()
export class GetAllController {
  @Get('launches')
  getAll(): Promise<LaunchesResponseDto> {
    return null;
  }
}
