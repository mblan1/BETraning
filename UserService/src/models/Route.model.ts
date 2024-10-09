import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RouteWithPermission } from './RouteWithPermission';

@Entity()
export class Routes {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', length: 50 })
    method: string;

    @OneToMany(() => RouteWithPermission, (routeWithPermission) => routeWithPermission.route)
    routeWithPermissions: RouteWithPermission[];
}
