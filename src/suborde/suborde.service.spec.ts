import { Test, TestingModule } from '@nestjs/testing';
import { SubordeService } from './suborde.service';

describe('SubordeService', () => {
  let service: SubordeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubordeService],
    }).compile();

    service = module.get<SubordeService>(SubordeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
