import { ExternaLaunchDto } from 'src/modules/shared/infra/adapters/http/dto';
import { CreateRocketLaunchDto } from '../../dtos';

export class PopulateInitialDataMapper {
  public static toPersistence(
    launches: ExternaLaunchDto[],
    rocketNames: string[],
  ): CreateRocketLaunchDto[] {
    return launches
      .filter((item) =>
        Object.values(item).some((value) => value !== null && value !== ''),
      )
      .map((item, index) => ({
        flightNumber: item.flight_number,
        missionName: item.name,
        dateLaunch: item.date_local,
        rocketId: item.rocket,
        rocketName: rocketNames[index],
        success: item.success,
        youtubeLink: item.links.webcast,
      }));
  }
}
