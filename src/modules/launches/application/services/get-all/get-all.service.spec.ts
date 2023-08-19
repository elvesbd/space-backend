import { Test, TestingModule } from '@nestjs/testing';
import { GetAllService } from './get-all.service';
import { LaunchesRepository } from 'src/modules/launches/repositories';
import { FiltersDto } from 'src/modules/launches/dto';

describe('GetAllService', () => {
  let sut: GetAllService;
  let launchesRepository: LaunchesRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const LaunchesRepositoryProvider = {
      provide: 'LAUNCHES_REPOSITORY',
      useValue: {
        getAll: jest.fn().mockResolvedValue({}),
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
    const search = 'tesla';
    const limit = 4;

    it('should be called launchesRepository.getAll with correct values', async () => {
      await sut.execute(search, limit);
      expect(launchesRepository.getAll).toHaveBeenCalledTimes(1);
      expect(launchesRepository.getAll).toHaveBeenCalledWith(search, limit);
    });
  });
});
