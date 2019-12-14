import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { userSeedData } from './user-seed-data'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
        this.seedUsers(userSeedData);
    }

    seedUsers(data: UserDTO[]) {
        Logger.log('Seeding users', 'UserController');
        for (let user of data) {
            this.userService.create(user);
        }   
    }
}
