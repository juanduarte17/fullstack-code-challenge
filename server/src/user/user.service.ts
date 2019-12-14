import { Injectable, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private userRepository: Repository<UserEntity>
        ) {}
    
    async create(data: UserDTO) {
        let userExist = await this.userRepository.findOne({
            where: { email: data.email },
        });
        if (!userExist) {
            let user = await this.userRepository.create(data);
            user = await this.userRepository.save(user);
            Logger.log(`User ${user.firstName} ${user.lastName} created`, 'UserService: create()');
        } else {
            Logger.error('User already exist', '','UserService: create()');
        }  
    }

    async showAll() {
        const users = await this.userRepository.find();
        return users.map(user => user.toResponseObject(false));
    }

    async login(data: UserDTO) {
        const {email, password } = data
        let user = await this.userRepository.findOne({
            where: { email: data.email },
        });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
        }

        return user.toResponseObject();
    }
}
