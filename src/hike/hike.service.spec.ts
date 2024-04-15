import { Test, TestingModule } from '@nestjs/testing';
import { HikeService } from './hike.service';

describe('HikeService', () => {
  let service: HikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HikeService],
    }).compile();

    service = module.get<HikeService>(HikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
