import { Test, TestingModule } from '@nestjs/testing';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';
import { LatestLaunchImporter } from './latest-launch-importer.service';
import {
  LaunchesHttpService,
  RocketsHttpService,
} from 'src/modules/shared/infra/adapters/interfaces';
import { ExternalLaunchDataBuilder } from '../../../__mocks__/data-builder/external-launche-data.builder';

describe('LatestLaunchImporter', () => {
  let sut: LatestLaunchImporter;
  let launchesHttpService: LaunchesHttpService;
  let rocketsHttpService: RocketsHttpService;
  let launchesRepository: LaunchesRepository;

  const latestLaunch = ExternalLaunchDataBuilder.aLaunch().build();
  const rocketName = 'Falcon 9';
  const mappedLatestLaunch = {
    dateLaunch: '2020-03-06T23:50:31-05:00',
    flightNumber: 91,
    missionName: 'CRS-20',
    rocketId: '5e9d0d95eda69973a809d1ec',
    rocketName: 'Falcon 9',
    success: true,
    youtubeLink: 'https://youtu.be/1MkcWK2PnsU',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const LaunchesHttpServiceProvider = {
      provide: 'LAUNCHES_HTTP_SERVICE',
      useValue: {
        getLatestData: jest.fn().mockResolvedValue(latestLaunch),
      },
    };

    const RocketsHttpServiceProvider = {
      provide: 'ROCKETS_HTTP_SERVICE',
      useValue: {
        getRocketName: jest.fn().mockResolvedValue(rocketName),
      },
    };

    const LaunchesRepositoryProvider = {
      provide: 'LAUNCHES_REPOSITORY',
      useValue: {
        saveLatestLaunch: jest.fn().mockResolvedValue(void 0),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LatestLaunchImporter,
        LaunchesHttpServiceProvider,
        RocketsHttpServiceProvider,
        LaunchesRepositoryProvider,
      ],
    }).compile();

    sut = module.get<LatestLaunchImporter>(LatestLaunchImporter);
    launchesHttpService = module.get<LaunchesHttpService>(
      'LAUNCHES_HTTP_SERVICE',
    );
    rocketsHttpService = module.get<RocketsHttpService>('ROCKETS_HTTP_SERVICE');
    launchesRepository = module.get<LaunchesRepository>('LAUNCHES_REPOSITORY');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(launchesHttpService).toBeDefined();
    expect(rocketsHttpService).toBeDefined();
    expect(launchesRepository).toBeDefined();
  });

  describe('handle()', () => {
    it('should be called launchesHttpService.getLatestData with correct value', async () => {
      await sut.handle();
      expect(launchesHttpService.getLatestData).toHaveBeenCalledTimes(1);
      expect(launchesHttpService.getLatestData).toHaveBeenCalledWith();
    });
  });
});
