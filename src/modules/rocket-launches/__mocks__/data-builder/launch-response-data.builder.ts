import { LaunchesResponseDto } from '../../dto';
import { LaunchDataBuilder } from './launch-data.builder';

export class LaunchResponseDataBuilder {
  private launchResponseDto: LaunchesResponseDto = {
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

  build(): LaunchesResponseDto {
    return this.launchResponseDto;
  }
}
