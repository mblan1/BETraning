import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './Role.models';
import { Permissions } from './Permission.model';

@Entity()
export class RoleWithPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleId: number;

    @Column()
    permissionId: number;

    @ManyToOne(() => Roles, (role) => role.id)
    @JoinColumn({ name: 'roleId' })
    role: Roles;

    @ManyToOne(() => Permissions, (permission) => permission.id)
    @JoinColumn({ name: 'permissionId' })
    permission: Permissions;
}
