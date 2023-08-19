import { Test, TestingModule } from '@nestjs/testing';
import { GetAllService } from './get-all.service';

describe('GetAllService', () => {
  let sut: GetAllService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetAllService],
    }).compile();

    sut = module.get<GetAllService>(GetAllService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
