import { ExternaLaunchDto } from 'src/modules/shared/infra/adapters/http/dto';
import { CreateRocketLaunchDto } from '../../dtos';

export class LatestLaunchImporterMapper {
  public static toPersistence(
    launch: ExternaLaunchDto,
    rocketName: string,
  ): CreateRocketLaunchDto {
    return {
      flightNumber: launch.flight_number,
      missionName: launch.name,
      dateLaunch: launch.date_local,
      rocketId: launch.rocket,
      rocketName: rocketName,
      success: launch.success,
      youtubeLink: launch.links.webcast,
    };
  }
}
