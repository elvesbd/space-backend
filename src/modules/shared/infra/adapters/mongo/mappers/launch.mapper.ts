/* import { LaunchDto } from 'src/modules/launches/dto';
import { Launch } from '../schemas';

export class LaunchMapper {
  public static toDto(launches: Launch[]): LaunchDto[] {
    const mappedLaunches = launches.map((launch) => ({
      id: launch._id.toString(),
      fairings: launch.fairings,
      links: launch.links,
      static_fire_date_utc: launch.static_fire_date_utc,
      static_fire_date_unix: launch.static_fire_date_unix,
      net: launch.net,
      window: launch.window,
      rocket: launch.rocket,
      success: launch.success,
      failures: launch.failures,
      details: launch.details,
      crew: launch.crew,
      ships: launch.ships,
      capsules: launch.capsules,
      payloads: launch.payloads,
      launchpad: launch.launchpad,
      flight_number: launch.flight_number,
      name: launch.name,
      date_utc: launch.date_utc,
      date_unix: launch.date_unix,
      date_local: launch.date_local,
      date_precision: launch.date_precision,
      upcoming: launch.upcoming,
      cores: launch.cores,
      auto_update: launch.auto_update,
      tbd: launch.tbd,
      launch_library_id: launch.launch_library_id,
    }));

    return mappedLaunches;
  }
}
 */
