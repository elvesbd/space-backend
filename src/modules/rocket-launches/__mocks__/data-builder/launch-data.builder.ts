import { LaunchEntity } from '../../entity';

export class LaunchDataBuilder {
  private launch: LaunchEntity = {
    //id: '5eb87d46ffd86e000604b388',
    flightNumber: 94,
    rocketId: '5e9d0d95eda69973a809d1ec',
    rocketName: 'Falcon 1',
    dateLaunch: '2020-05-30T15:22:00-04:00',
    missionName: 'Starlink 4-35 (v1.5)',
    success: true,
    youtubeLink: null,
  };

  static aLaunch(): LaunchDataBuilder {
    return new LaunchDataBuilder();
  }

  build(): LaunchEntity {
    return this.launch;
  }
}
