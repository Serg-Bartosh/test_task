import { Test, TestingModule } from '@nestjs/testing';
import { GroupsService } from './groups.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Group } from './entities/groups.entity';
import { DataSource } from 'typeorm';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('GroupsService', () => {
    let service: GroupsService;

    const mockQueryBuilder = {
        leftJoin: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        having: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockImplementation(() =>
            Promise.resolve([{ id: '1', name: 'Active Group' }])
        ),
    };

    const mockGroupRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        createQueryBuilder: jest.fn(() => mockQueryBuilder as any),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GroupsService,
                {
                    provide: getRepositoryToken(Group),
                    useValue: mockGroupRepository,
                },
                {
                    provide: DataSource,
                    useValue: {
                        transaction: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<GroupsService>(GroupsService);
    });

    it('service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should filter active groups by min 5 students', async () => {
        const result = await service.findActive();
        expect(result).toEqual([{ id: '1', name: 'Active Group' }]);
        expect(mockQueryBuilder.having).toHaveBeenCalledWith('COUNT(student.id) >= 5');
    });
});