import { IsDateString, IsNotEmpty, IsString, Length, MinDate } from 'class-validator';

export class CreateGroupDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name!: string;

    @IsDateString()
    @IsNotEmpty()
    @MinDate(new Date(), { message: 'StartDate cannot be in the past' })
    startDate!: string;
}