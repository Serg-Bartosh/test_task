import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/students (POST) - should validate email', () => {
    return request(app.getHttpServer())
      .post('/students')
      .send({ name: 'John', email: 'not-an-email' })
      .expect(400);
  });

  it('/groups/active (GET) - should return 200', () => {
    return request(app.getHttpServer())
      .get('/groups/active')
      .expect(200);
  });

  it('/external/courses (GET) - should return transformed products', async () => {
    const response = await request(app.getHttpServer())
      .get('/external/courses')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).not.toHaveProperty('description');
    }
  });

  afterAll(async () => {
    await app.close();
  });
});