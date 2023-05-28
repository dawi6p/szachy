import { Test, TestingModule } from '@nestjs/testing';
import { MatchtypeService } from './matchtype.service';

describe('MatchtypeService', () => {
  let service: MatchtypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatchtypeService],
    }).compile();

    service = module.get<MatchtypeService>(MatchtypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
