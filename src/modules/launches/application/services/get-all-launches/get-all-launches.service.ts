import { Inject, Injectable } from '@nestjs/common';
import {
  FiltersDto,
  LaunchDto,
  MapLaunchesWithRocketNamesDto,
} from 'src/modules/launches/dto';
import { GetAllLaunchesResponseDto } from 'src/modules/launches/dto/get-all-launches-response.dto copy';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { RocketsHttpService } from 'src/modules/shared/infra/adapters/interfaces';

@Injectable()
export class GetAllLaunchesService {
  constructor(
    @Inject('ROCKETS_HTTP_SERVICE')
    private readonly httpService: RocketsHttpService,
    @Inject('LAUNCHES_REPOSITORY')
    private readonly launchesRepository: LaunchesRepository,
  ) {}

  async handle(filtersDto: FiltersDto): Promise<GetAllLaunchesResponseDto> {
    const { results, totalDocs, page, totalPages, hasNext, hasPrev } =
      await this.launchesRepository.getAllWithFilters(filtersDto);

    const launchesWithRocketNames = await this.mapLaunchesWithRocketNames(
      results,
    );

    const launchesResponse: GetAllLaunchesResponseDto = {
      results: launchesWithRocketNames,
      totalDocs,
      page,
      totalPages,
      hasNext,
      hasPrev,
    };

    return launchesResponse;
  }

  private async mapLaunchesWithRocketNames(
    launches: LaunchDto[],
  ): Promise<MapLaunchesWithRocketNamesDto[]> {
    const rocketIds = launches.map((item) => item.rocket);
    const rocketNames = await this.httpService.getRockets(rocketIds);

    return launches.map((item, index) => ({
      youtubeLink: item.links.webcast,
      success: item.success,
      flightNumber: item.flightNumber,
      missionName: item.name,
      date: item.dateLocal,
      rocketName: rocketNames[index],
    }));
  }
}
