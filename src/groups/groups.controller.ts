import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/createGroup.dto';
import { AddStudentDto } from './dto/add-student.dto';
import { Group } from './entities/groups.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  async findAll(): Promise<Group[]> {
    return this.groupsService.findAll();
  }

  @Get('active')
  async findActive(): Promise<Partial<Group>[]> {
    return this.groupsService.findActive();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Group> {
    return this.groupsService.findOne(id);
  }

  @Post(':groupId/students')
  async addStudent(
    @Param('groupId', new ParseUUIDPipe()) groupId: string,
    @Body() addStudentDto: AddStudentDto,
  ): Promise<Group> {
    return this.groupsService.addStudentToGroup(groupId, addStudentDto.studentId);
  }
}