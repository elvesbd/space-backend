import { LaunchDto } from '../../dto';

export class LaunchDataBuilder {
  private launch: LaunchDto = {
    launchId: '64ebec62d002cbe0eec8ee08',
    flightNumber: 187,
    missionName: 'Crew-5',
    dateLaunch: '2022-10-05T12:00:00-04:00',
    rocketName: 'Falcon 9',
    rocketId: '5e9d0d95eda69973a809d1ec',
    success: true,
    youtubeLink: 'https://youtu.be/5EwW8ZkArL4',
  };

  static aLaunch(): LaunchDataBuilder {
    return new LaunchDataBuilder();
  }

  build(): LaunchDto {
    return this.launch;
  }
}
