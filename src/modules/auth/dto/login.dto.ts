import { IsNotEmpty, IsString } from 'class-validator';
import type { ILoginFilter } from '../interfaces/login.interface';

export class LoginDto implements ILoginFilter {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    constructor(params: ILoginFilter) {
        this.username = params?.username;
        this.password = params?.password;
    }
}
