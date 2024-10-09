import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleWithPermission } from './RoleWithPermission';

@Entity()
export class Roles {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @OneToMany(() => RoleWithPermission, (roleWithPermission) => roleWithPermission.role)
    roleWithPermission: RoleWithPermission[];
}
