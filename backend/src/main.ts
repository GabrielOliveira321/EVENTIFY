import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required. Set it in your .env file or environment.');
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();