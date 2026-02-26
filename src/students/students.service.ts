import { Injectable, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/createStudent.dto';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) { }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      const student = this.studentRepository.create(createStudentDto);
      return await this.studentRepository.save(student);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      this.logger.error(`Failed to create student: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }
}