import { Module } from '@nestjs/common';
import { SubordeService } from './suborde.service';
import { SubordeController } from './suborde.controller';

@Module({
  controllers: [SubordeController],
  providers: [SubordeService]
})
export class SubordeModule {}
