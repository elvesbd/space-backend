import { LaunchDto } from 'src/modules/rocket-launches/dto';
import { Launch } from '../schemas';
export class LaunchMapper {
  public static toDto(launches: Launch[]): LaunchDto[] {
    return launches.map((launch) => ({
      launchId: launch._id.toString(),
      flightNumber: launch.flightNumber,
      missionName: launch.missionName,
      dateLaunch: launch.dateLaunch,
      rocketName: launch.rocketName,
      rocketId: launch.rocketId,
      success: launch.success,
      youtubeLink: launch.youtubeLink,
    }));
  }
}
