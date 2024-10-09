import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleWithPermission } from './RoleWithPermission';
import { RouteWithPermission } from './RouteWithPermission';

@Entity()
export class Permissions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 50 })
    description: string;

    @OneToMany(() => RoleWithPermission, (roleWithPermission) => roleWithPermission.permission)
    roleWithPermission: RoleWithPermission[];

    @OneToMany(() => RouteWithPermission, (routeWithPermission) => routeWithPermission.permission)
    routeWithPermission: RouteWithPermission[];
}
