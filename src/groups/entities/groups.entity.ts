import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Student } from '../../students/entities/student.entity';

@Entity('groups')
export class Group {
    @PrimaryGeneratedColumn('uuid')
    declare id: string;

    @Column()
    declare name: string;

    @Column({ type: 'date' })
    declare startDate: Date;

    @CreateDateColumn()
    declare createdAt: Date;

    @ManyToMany(() => Student, (student) => student.groups)
    @JoinTable()
    declare students: Student[];
}