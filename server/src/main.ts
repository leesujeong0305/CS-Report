import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cors({
      origin: 'http://ubisampaju.synology.me:9101', // 허용할 클라이언트 URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    }),
  );

  // ValidationPipe에 transform 활성화
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO에 정의되지 않은 속성 제거
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 에러 반환
      transform: true, // 요청 데이터를 DTO의 타입에 맞게 변환
    }),
  );

  // 클라이언트 정적 파일 제공
  app.use('/', express.static(join(__dirname, '..', 'public')));

  await app.listen(process.env.PORT ?? 9101);
}
bootstrap();
