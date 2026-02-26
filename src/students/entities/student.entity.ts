import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany } from 'typeorm';
import { Group } from '../../groups/entities/groups.entity';

@Entity('students')
export class Student {
    @PrimaryGeneratedColumn('uuid')
    declare id: string;

    @Column()
    declare name: string;

    @Column({ unique: true })
    declare email: string;

    @CreateDateColumn()
    declare createdAt: Date;

    @ManyToMany(() => Group, (group) => group.students)
    declare groups: Group[];
}