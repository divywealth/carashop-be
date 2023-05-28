import { Test, TestingModule } from '@nestjs/testing';
import { SubordeController } from './suborde.controller';
import { SubordeService } from './suborde.service';

describe('SubordeController', () => {
  let controller: SubordeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubordeController],
      providers: [SubordeService],
    }).compile();

    controller = module.get<SubordeController>(SubordeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
