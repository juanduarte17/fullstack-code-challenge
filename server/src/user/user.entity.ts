import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn('text')
    email: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @OneToMany(type => ProductEntity, product => product.owner)
    products: ProductEntity[];
}