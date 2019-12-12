import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from 'src/user/user.entity';

@Entity('product')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    name: string;

    @Column('text')
    description: string;

    @Column('int')
    price: number;

    @Column('bytea')
    image: string;

    @ManyToOne(type => UserEntity, user => user.products)
    owner: UserEntity;
}