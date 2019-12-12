import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDTO } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
        const data = [
            {
                email: "juanduarte@pm.me",
                firstName: "Juan",
                lastName: "Duarte"
            },
            {
                email: "user2@gmail.com",
                firstName: "user",
                lastName: "2"
            },
            {
                email: "user3@gmail.com",
                firstName: "user",
                lastName: "3"
            },
            {
                email: "user4@gmail.com",
                firstName: "user",
                lastName: "4"
            },
            {
                email: "user5@gmail.com",
                firstName: "user",
                lastName: "5"
            },
        ];
        this.seedUsers(data);
    }

    seedUsers(data: UserDTO[]) {
        for (let user in data) {
            this.userService.create(user);
        }
        
    }
}
