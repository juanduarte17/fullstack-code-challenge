import {
    Controller,
    Logger,
    Get,
    Post,
    Body,
    UseGuards,
    Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { userSeedData } from './user-seed-data';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './user.decorator';

@Controller()
export class UserController {
    constructor(private userService: UserService) {
        this.seedUsers(userSeedData);
    }

    @Get('api/users')
    @UseGuards(new AuthGuard())
    showAllUsers() {
        return this.userService.showAll();
    }

    @Get('api/user/products')
    @UseGuards(new AuthGuard())
    getUserProducts(@User('id') userID) {
        return this.userService.getProducts(userID);
    }

    @Post('api/user/attach/:id')
    @UseGuards(new AuthGuard())
    attachProduct(@User('id') userID, @Param('id') id: string) {
        return this.userService.attach(userID, id);
    }

    @Post('api/user/deattach/:id')
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
