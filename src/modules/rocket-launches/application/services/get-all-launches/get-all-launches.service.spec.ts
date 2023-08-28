import { Test, TestingModule } from '@nestjs/testing';
import { GetAllLaunchesService } from './get-all-launches.service';
import { FiltersDto } from 'src/modules/rocket-launches/dto';
import { LaunchesRepository } from 'src/modules/rocket-launches/repositories';
import { LaunchResponseDataBuilder } from '../../../__mocks__/data-builder';

describe('GetAllLaunchesService', () => {
  let sut: GetAllLaunchesService;
  let launchesRepository: LaunchesRepository;

  const launches = LaunchResponseDataBuilder.aLaunchResponse().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const LaunchesRepositoryProvider = {
      provide: 'LAUNCHES_REPOSITORY',
      useValue: {
        getAllLaunches: jest.fn().mockResolvedValue(launches),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllLaunchesService, LaunchesRepositoryProvider],
    }).compile();

    sut = module.get<GetAllLaunchesService>(GetAllLaunchesService);
    launchesRepository = module.get<LaunchesRepository>('LAUNCHES_REPOSITORY');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(launchesRepository).toBeDefined();
  });

  describe('handle()', () => {
    const filtersDto: FiltersDto = {
      search: 'tesla',
      limit: 4,
      page: 1,
    };

    it('should be called launchesRepository.getAllLaunches with correct values', async () => {
      await sut.handle(filtersDto);
      expect(launchesRepository.getAllLaunches).toHaveBeenCalledTimes(1);
      expect(launchesRepository.getAllLaunches).toHaveBeenCalledWith(
        filtersDto,
      );
    });

    it('should be called launchesRepository.getAllLaunches with correct values when not filters', async () => {
      const notFilters = {};

      await sut.handle(notFilters);
      expect(launchesRepository.getAllLaunches).toHaveBeenCalledTimes(1);
      expect(launchesRepository.getAllLaunches).toHaveBeenCalledWith(
        notFilters,
      );
    });

    it('should be return all launches on success', async () => {
      const result = await sut.handle(filtersDto);
      expect(result).toStrictEqual(launches);
    });
  });
});
