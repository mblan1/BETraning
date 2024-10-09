import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Routes } from './Route.model';
import { Permissions } from './Permission.model';

@Entity()
export class RouteWithPermission {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    routeId: number;

    @Column()
    permissionId: number;

    @ManyToOne(() => Routes, (route) => route.id)
    @JoinColumn({ name: 'routeId' })
    route: Routes;

    @ManyToOne(() => Permissions, (permission) => permission.id)
    @JoinColumn({ name: 'permissionId' })
    permission: Permissions;
}
