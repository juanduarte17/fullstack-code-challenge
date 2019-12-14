import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, BeforeInsert } from 'typeorm';
import { ProductEntity } from 'src/product/product.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserResponseObject } from './user.dto';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true,
    })
    email: string;

    @Column('text')
    firstName: string;

    @Column('text')
    lastName: string;

    @Column('text')
    password: string;

    @OneToMany(type => ProductEntity, product => product.owner, { cascade: true })
    products: ProductEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    } 

    toResponseObject(showToken: boolean = true) {
        const {id, email, firstName, lastName, token} = this;
        const responseObject: UserResponseObject = {id, email, firstName, lastName};
        
        if (this.products) {
            responseObject.products = this.products;
        }

        if (showToken) {
            responseObject.token = token;
        }
        return responseObject;
    }

    async comparePassword(attempedPassword) {
        return await bcrypt.compare(attempedPassword, this.password);
    }

    private get token() {
        const { id, email } = this;
        return jwt.sign(
            {
                id,
                email
            }, process.env.SECRET,
            { expiresIn: '7d'}
        );
    }
}