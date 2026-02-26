import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Group } from './entities/groups.entity';
import { Student } from '../students/entities/student.entity';
import { CreateGroupDto } from './dto/createGroup.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto);
    return await this.groupRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find();
  }

  async findOne(id: string): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['students'],
    });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async findActive(): Promise<Partial<Group>[]> {
    return await this.groupRepository
      .createQueryBuilder('group')
      .leftJoin('group.students', 'student')
      .select(['group.id', 'group.name', 'group.startDate'])
      .where('group.startDate <= :now', { now: new Date() })
      .groupBy('group.id')
      .having('COUNT(student.id) >= 5')
      .getRawMany();
  }

  async addStudentToGroup(groupId: string, studentId: string): Promise<Group> {
    return await this.dataSource.transaction(async (manager) => {
      const group = await manager.findOne(Group, {
        where: { id: groupId },
        relations: ['students'],
      });
      const student = await manager.findOne(Student, { where: { id: studentId } });

      if (!group || !student) {
        throw new NotFoundException('Group or Student not found');
      }

      const isAlreadyInGroup = group.students.some((s) => s.id === studentId);
      if (isAlreadyInGroup) {
        throw new ConflictException('Student already in group');
      }

      group.students.push(student);
      return await manager.save(group);
    });
  }
}