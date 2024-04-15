import { Test, TestingModule } from '@nestjs/testing';
import { HikeController } from './hike.controller';
import { HikeService } from './hike.service';

describe('HikeController', () => {
  let controller: HikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HikeController],
      providers: [HikeService],
    }).compile();

    controller = module.get<HikeController>(HikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
