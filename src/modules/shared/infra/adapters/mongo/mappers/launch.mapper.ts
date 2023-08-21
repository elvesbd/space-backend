import { LaunchDto } from 'src/modules/launches/dto';
import { Launch } from '../schemas';

export class LaunchMapper {
  public static toPersistence(launch: any): LaunchDto {
    return {
      id: launch.id,
      fairings: launch.fairings,
      links: launch.links,
      staticFireDateUtc: launch.static_fire_date_utc,
      staticFireDateUnix: launch.static_fire_date_unix,
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
      flightNumber: launch.flight_number,
      name: launch.name,
      dateUtc: launch.date_utc,
      dateUnix: launch.date_unix,
      dateLocal: launch.date_local,
      datePrecision: launch.date_precision,
      upcoming: launch.upcoming,
      cores: launch.cores,
      autoUpdate: launch.auto_update,
      tbd: launch.tbd,
      launchLibraryId: launch.launch_library_id,
    };
  }
}
