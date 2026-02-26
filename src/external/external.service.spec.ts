import { Test, TestingModule } from '@nestjs/testing';
import { ExternalService } from './external.service';
import axios from 'axios';
import { DataSource } from 'typeorm';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ExternalService', () => {
    let service: ExternalService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ExternalService],
        }).compile();
        service = module.get<ExternalService>(ExternalService);
    });

    it('should return transformed data and cache it', async () => {
        const rawData = [{ id: 1, title: 'Test', price: 10, description: '...' }];
        mockedAxios.get.mockResolvedValue({ data: rawData });

        const result = await service.getCourses();
        expect(result[0]).not.toHaveProperty('description');
        expect(result[0].title).toBe('Test');
    });

    it('should return cached data if API fails', async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: [{ id: 1, title: 'Cached' }] });
        await service.getCourses();

        mockedAxios.get.mockRejectedValueOnce(new Error('API Down'));
        const result = await service.getCourses();
        expect(result[0].title).toBe('Cached');
    });
});