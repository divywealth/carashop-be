import { Test, TestingModule } from '@nestjs/testing';
import { UserproductController } from './userproduct.controller';
import { UserproductService } from './userproduct.service';

describe('UserproductController', () => {
  let controller: UserproductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserproductController],
      providers: [UserproductService],
    }).compile();

    controller = module.get<UserproductController>(UserproductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
