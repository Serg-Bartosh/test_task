import { Controller, Get } from '@nestjs/common';
import { ExternalService, CourseResponse } from './external.service';

@Controller('external')
export class ExternalController {
  constructor(private readonly externalService: ExternalService) { }

  @Get('courses')
  async findAll(): Promise<CourseResponse[]> {
    return this.externalService.getCourses();
  }
}