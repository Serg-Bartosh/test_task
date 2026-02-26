import { IsDateString, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGroupDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name!: string;

    @IsDateString()
    @IsNotEmpty()
    startDate!: string;
}