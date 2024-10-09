import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    description: string;

    @Column({ type: 'bigint' })
    price: number;

    @Column({ type: 'int' })
    userId: number;
}
