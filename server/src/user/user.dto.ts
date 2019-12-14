import { IsString } from 'class-validator';

export class UserDTO {
    @IsString()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}