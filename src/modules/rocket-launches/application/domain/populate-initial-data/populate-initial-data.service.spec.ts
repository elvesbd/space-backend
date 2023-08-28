import { Test, TestingModule } from '@nestjs/testing';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';
import {
  LaunchesHttpService,
  RocketsHttpService,
} from 'src/modules/shared/infra/adapters/interfaces';
import { ExternalLaunchDataBuilder } from '../../../__mocks__/data-builder/external-launche-data.builder';
import { PopulateInitialDataService } from './populate-initial-data.service';

describe('PopulateInitialDataService', () => {
  let sut: PopulateInitialDataService;
  let launchesHttpService: LaunchesHttpService;
  let rocketsHttpService: RocketsHttpService;
  let launchesRepository: LaunchesRepository;

  const launches = ExternalLaunchDataBuilder.aLaunch().build();
  const rocketIds = ['5e9d0d95eda69973a809d1ec'];
  const rocketNames = ['Falcon 9', 'Falcon'];
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
        getData: jest.fn().mockResolvedValue([launches]),
      },
    };

    const RocketsHttpServiceProvider = {
      provide: 'ROCKETS_HTTP_SERVICE',
      useValue: {
        getRocketNames: jest.fn().mockResolvedValue(rocketNames),
      },
    };

    const LaunchesRepositoryProvider = {
      provide: 'LAUNCHES_REPOSITORY',
      useValue: {
        createLaunch: jest.fn().mockResolvedValue(void 0),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PopulateInitialDataService,
        LaunchesHttpServiceProvider,
        RocketsHttpServiceProvider,
        LaunchesRepositoryProvider,
      ],
    }).compile();

    sut = module.get<PopulateInitialDataService>(PopulateInitialDataService);
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
    it('should be called launchesHttpService.getData with correct value', async () => {
      await sut.handle();
      expect(launchesHttpService.getData).toHaveBeenCalledTimes(1);
      expect(launchesHttpService.getData).toHaveBeenCalledWith();
    });

    it('should be called rocketsHttpService.getRocketName with correct value', async () => {
      await sut.handle();
      expect(rocketsHttpService.getRocketNames).toHaveBeenCalledTimes(1);
      expect(rocketsHttpService.getRocketNames).toHaveBeenCalledWith(rocketIds);
    });

    it('should be called launchesRepository.createLaunch with correct value', async () => {
      await sut.handle();
      expect(launchesRepository.createLaunch).toHaveBeenCalledTimes(1);
      expect(launchesRepository.createLaunch).toHaveBeenCalledWith(
        mappedLatestLaunch,
      );
    });
  });
});
