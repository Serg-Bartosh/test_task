import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddStudentDto {
    @IsUUID()
    @IsNotEmpty()
    studentId!: string;
}