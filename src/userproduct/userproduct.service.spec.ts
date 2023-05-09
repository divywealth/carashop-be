import { Test, TestingModule } from '@nestjs/testing';
import { UserproductService } from './userproduct.service';

describe('UserproductService', () => {
  let service: UserproductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserproductService],
    }).compile();

    service = module.get<UserproductService>(UserproductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
