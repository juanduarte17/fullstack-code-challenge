import {
    Controller,
    Logger,
    Get,
    Post,
    Body,
    UseGuards,
    Param,
    Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { userSeedData } from './user-seed-data';
import { AuthGuard } from '../shared/auth.guard';
import { User } from './user.decorator';

@Controller()
export class UserController {
    constructor(private userService: UserService) {
        if (process.env.IS_SEEDING_USERS === 'true') {
            this.seedUsers(userSeedData);
        }
    }

    @Get('api/users')
    @UseGuards(new AuthGuard())
    showAllUsers() {
        return this.userService.showAll();
    }

    @Get('api/users/products')
    @UseGuards(new AuthGuard())
    getUserProducts(@User('id') userID) {
        return this.userService.getProducts(userID);
    }

    @Post('api/users/products/:id')
    @UseGuards(new AuthGuard())
    attachProduct(@User('id') userID, @Param('id') id: string) {
        return this.userService.attach(userID, id);
    }

    @Delete('api/users/products/:id')
    @UseGuards(new AuthGuard())
    deattachProduct(@User('id') userID, @Param('id') id: string) {
        return this.userService.deattach(userID, id);
    }

    @Post('login')
    login(@Body() data: UserDTO) {
        return this.userService.login(data);
    }

    private seedUsers(data: UserDTO[]) {
        Logger.log('Seeding users', 'UserController');
        for (const user of data) {
            this.userService.create(user);
        }
    }
}
