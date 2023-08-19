import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { FiltersDto, LaunchesResponseDto } from '../../dto';
import { GetAllService } from '../../application/services/get-all';
import { OptionalParseIntPipe } from 'src/modules/shared/pipes';

@Controller()
export class GetAllController {
  constructor(private readonly getAllService: GetAllService) {}

  @Get('launches')
  getAll(
    @Query('search') search: string,
    @Query('limit', OptionalParseIntPipe) limit: number,
    @Query('page', OptionalParseIntPipe) page: number,
  ): Promise<LaunchesResponseDto> {
    const filtersDto: FiltersDto = {
      search,
      limit,
      page,
    };
    return this.getAllService.execute(filtersDto);
  }

  @Post('launches')
  create(@Body() dto: any): Promise<any> {
    return this.getAllService.create(dto);
  }
}
