import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './Role.models';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    username: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'int' })
    roleId: number;

    @OneToOne(() => Roles, (role) => role.id)
    @JoinColumn({ name: 'roleId' })
    role: Roles;
}
