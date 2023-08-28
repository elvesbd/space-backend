import { Test, TestingModule } from '@nestjs/testing';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';
import { LaunchDataBuilder } from '../../../__mocks__/data-builder';
import { GetLaunchChartDataService } from './get-launch-chart-data.service';
import { YearlyRocketCountsDataBuilder } from '../../../__mocks__/data-builder/yearly-rocket-count-data.builder';

describe('GetLaunchChartDataService', () => {
  let sut: GetLaunchChartDataService;
  let launchesRepository: LaunchesRepository;

  const launches = LaunchDataBuilder.aLaunch().build();
  const yearlyRocketCounts =
    YearlyRocketCountsDataBuilder.aYearlyRocketCounts().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const LaunchesRepositoryProvider = {
      provide: 'LAUNCHES_REPOSITORY',
      useValue: {
        getAllLaunches: jest.fn().mockResolvedValue([launches]),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetLaunchChartDataService, LaunchesRepositoryProvider],
    }).compile();

    sut = module.get<GetLaunchChartDataService>(GetLaunchChartDataService);
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

    it('should be return all yearly rocket counts on success', async () => {
      const result = await sut.handle();
      expect(result).toStrictEqual([yearlyRocketCounts]);
    });
  });
});
