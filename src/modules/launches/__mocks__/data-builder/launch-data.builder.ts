import { LaunchDto } from '../../dto';

export class LaunchDataBuilder {
  private launchDto: LaunchDto = {
    fairings: null,
    links: null,
    static_fire_date_utc: '2020-05-22T17:39:00.000Z',
    static_fire_date_unix: 1590169140,
    net: false,
    tbd: false,
    window: 0,
    rocket: '5e9d0d95eda69973a809d1ec',
    success: true,
    failures: [],
    details: 'SpaceX will launch the second demonstration mission',
    crew: ['5ebf1b7323a9a60006e03a7b', '5ebf1a6e23a9a60006e03a7a'],
    ships: [
      '5ea6ed30080df4000697c913',
      '5ea6ed2f080df4000697c90b',
      '5ea6ed2f080df4000697c90c',
      '5ea6ed2e080df4000697c909',
      '5ea6ed2f080df4000697c90d',
    ],
    capsules: ['5e9e2c5df359188aba3b2676'],
    payloads: ['5eb0e4d1b6c3bb0006eeb257'],
    launchpad: '5e9e4502f509094188566f88',
    auto_update: true,
    flight_number: 94,
    name: 'tesla',
    date_utc: '2020-05-30T19:22:00.000Z',
    date_unix: 1590866520,
    date_local: '2020-05-30T15:22:00-04:00',
    date_precision: 'hour',
    upcoming: false,
    cores: [null],
    id: '5eb87d46ffd86e000604b388',
  };

  static aLaunch(): LaunchDataBuilder {
    return new LaunchDataBuilder();
  }

  build(): LaunchDto {
    return this.launchDto;
  }
}
