import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configservice = app.get(ConfigService)
  const port = configservice.get('PORT')
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(port || 3000);
}
bootstrap();
