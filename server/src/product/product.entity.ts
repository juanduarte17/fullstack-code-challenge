import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('numeric')
    price: number;

    @Column({
        type: 'bytea',
        nullable: true,
    })
    image: string;

    @ManyToOne(
        type => UserEntity,
        user => user.products,
    )
    owner: UserEntity;
}
