import { Controller, Logger, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { userSeedData } from './user-seed-data'

@Controller()
export class UserController {
    constructor(private userService: UserService) {
        this.seedUsers(userSeedData);
    }

    @Get('api/users')
    showAllUsers() {
        return this.userService.showAll();
    }

    @Post('login')
    login(@Body() data: UserDTO) {
        return this.userService.login(data);
    }

    private seedUsers(data: UserDTO[]) {
        Logger.log('Seeding users', 'UserController');
        for (let user of data) {
            this.userService.create(user);
        }   
    }
}
