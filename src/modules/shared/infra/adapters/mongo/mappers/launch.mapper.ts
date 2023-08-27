import { ExternaLaunchDto } from '../../http/dto';
import { LaunchEntity } from 'src/modules/rocket-launches/entity';

export class LaunchMapper {
  public static toPersistence(launch: ExternaLaunchDto): LaunchEntity {
    return {
      fairings: launch.fairings
        ? {
            reused: launch.fairings.reused,
            recoveryAttempt: launch.fairings.recovery_attempt,
            recovered: launch.fairings.recovered,
            ships: launch.fairings.ships,
          }
        : null,
      links: {
        patch: {
          small: launch.links.patch.small,
          large: launch.links.patch.large,
        },
        reddit: {
          campaign: launch.links.reddit.campaign,
          launch: launch.links.reddit.launch,
          media: launch.links.reddit.media,
          recovery: launch.links.reddit.recovery,
        },
        flickr: {
          small: launch.links.flickr.small,
          original: launch.links.flickr.original,
        },
        presskit: launch.links.presskit,
        webcast: launch.links.webcast,
        youtubeId: launch.links.youtube_id,
        article: launch.links.article,
        wikipedia: launch.links.wikipedia,
      },
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
      cores: launch.cores.map((launch) => ({
        core: launch.core,
        flight: launch.flight,
        gridfins: launch.gridfins,
        legs: launch.legs,
        reused: launch.reused,
        landingAttempt: launch.landing_attempt,
        landingSuccess: launch.landing_success,
        landingType: launch.landing_type,
        landpad: launch.landpad,
      })),
      autoUpdate: launch.auto_update,
      tbd: launch.tbd,
      launchLibraryId: launch.launch_library_id,
      id: launch.id,
    };
  }
}
