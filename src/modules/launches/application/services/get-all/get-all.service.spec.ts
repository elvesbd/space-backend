import { Test, TestingModule } from '@nestjs/testing';
import { GetAllService } from './get-all.service';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { LaunchResponseDataBuilder } from '../../../__mocks__/data-builder';
import { FiltersDto } from 'src/modules/launches/dto';

describe('GetAllService', () => {
  let sut: GetAllService;
  let launchesRepository: LaunchesRepository;

  const launches = LaunchResponseDataBuilder.aLaunchResponse().build();

  beforeEach(async () => {
    jest.clearAllMocks();

    const LaunchesRepositoryProvider = {
      provide: 'LAUNCHES_REPOSITORY',
      useValue: {
        getAll: jest.fn().mockResolvedValue(launches),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllService, LaunchesRepositoryProvider],
    }).compile();

    sut = module.get<GetAllService>(GetAllService);
    launchesRepository = module.get<LaunchesRepository>('LAUNCHES_REPOSITORY');
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
    expect(launchesRepository).toBeDefined();
  });

  describe('execute()', () => {
    const filtersDto: FiltersDto = {
      search: 'tesla',
      limit: 4,
      page: 1,
    };

    it('should be called launchesRepository.getAll with correct values', async () => {
      await sut.execute(filtersDto);
      expect(launchesRepository.getAll).toHaveBeenCalledTimes(1);
      expect(launchesRepository.getAll).toHaveBeenCalledWith(filtersDto);
    });

    it('should be called launchesRepository.getAll with correct values when not filters', async () => {
      const notFilters = {};

      await sut.execute(notFilters);
      expect(launchesRepository.getAll).toHaveBeenCalledTimes(1);
      expect(launchesRepository.getAll).toHaveBeenCalledWith(notFilters);
    });

    it('should be return all launches on success', async () => {
      const result = await sut.execute(filtersDto);
      expect(result).toStrictEqual(launches);
    });
  });
});
