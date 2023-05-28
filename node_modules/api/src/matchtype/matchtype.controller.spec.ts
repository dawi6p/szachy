import { Test, TestingModule } from '@nestjs/testing';
import { MatchtypeController } from './matchtype.controller';

describe('MatchtypeController', () => {
  let controller: MatchtypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchtypeController],
    }).compile();

    controller = module.get<MatchtypeController>(MatchtypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
