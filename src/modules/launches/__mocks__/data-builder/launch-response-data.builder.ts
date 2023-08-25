import { LaunchesDto } from '../../dto';
import { LaunchDataBuilder } from './launch-data.builder';

export class LaunchResponseDataBuilder {
  private launchResponseDto: LaunchesDto = {
    results: [
      LaunchDataBuilder.aLaunch().build(),
      LaunchDataBuilder.aLaunch().build(),
    ],
    totalDocs: 2,
    page: 1,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  };

  static aLaunchResponse(): LaunchResponseDataBuilder {
    return new LaunchResponseDataBuilder();
  }

  build(): LaunchesDto {
    return this.launchResponseDto;
  }
}
