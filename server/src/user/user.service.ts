import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
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
            const users = await this.userRepository.create(data);
            await this.userRepository.save(users);
        } else {
            throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
        }   
    }
}
