import { Test, TestingModule } from '@nestjs/testing';
import { GetAllService } from './get-all.service';
import { LaunchesRepository } from 'src/modules/launches/repositories';

describe('GetAllService', () => {
  let sut: GetAllService;
  let launchesRepository: LaunchesRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const LaunchesRepositoryProvider = {
      provide: 'LAUNCHES_REPOSITORY',
      useValue: {
        getAll: jest.fn().mockResolvedValue(null),
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
});
