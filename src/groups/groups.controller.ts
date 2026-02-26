import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/createGroup.dto';
import { AddStudentDto } from './dto/add-student.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get('active')
  findActive() {
    return this.groupsService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Post(':groupId/students')
  addStudent(
    @Param('groupId') groupId: string,
    @Body() addStudentDto: AddStudentDto,
  ) {
    return this.groupsService.addStudentToGroup(groupId, addStudentDto.studentId);
  }
}