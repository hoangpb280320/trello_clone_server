import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // set prefix api "http://localhost:3000/api/"
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove un-existed properties automatically
      forbidNonWhitelisted: true, // throw err if there is any un-declared property
      transform: true, // convert value to valid type automatically
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
