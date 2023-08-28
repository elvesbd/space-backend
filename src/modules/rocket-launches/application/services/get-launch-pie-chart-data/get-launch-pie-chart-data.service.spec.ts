import { Test, TestingModule } from '@nestjs/testing';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';
import { LaunchDataBuilder } from '../../../__mocks__/data-builder';
import { GetLaunchPieChartDataService } from './get-launch-pie-chart-data.service';
import { RocketPieChartDataBuilder } from '../../../__mocks__/data-builder/rocket-pie-chart-data.builder';

describe('GetLaunchPieChartDataService', () => {
  let sut: GetLaunchPieChartDataService;
  let launchesRepository: LaunchesRepository;

  const launches = LaunchDataBuilder.aLaunch().build();
  const rocketPieChartData =
    RocketPieChartDataBuilder.aRocketPieChartData().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const LaunchesRepositoryProvider = {
      provide: 'LAUNCHES_REPOSITORY',
      useValue: {
        getAllLaunches: jest.fn().mockResolvedValue([launches]),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetLaunchPieChartDataService, LaunchesRepositoryProvider],
    }).compile();

    sut = module.get<GetLaunchPieChartDataService>(
      GetLaunchPieChartDataService,
    );
    launchesRepository = module.get<LaunchesRepository>('LAUNCHES_REPOSITORY');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(launchesRepository).toBeDefined();
  });

  describe('handle()', () => {
    it('should be called launchesRepository.getAllLaunches with correct value', async () => {
      await sut.handle();
      expect(launchesRepository.getAllLaunches).toHaveBeenCalledTimes(1);
      expect(launchesRepository.getAllLaunches).toHaveBeenCalledWith();
    });

    it('should be return rocket pie chart data on success', async () => {
      const result = await sut.handle();
      expect(result).toStrictEqual(rocketPieChartData);
    });
  });
});
