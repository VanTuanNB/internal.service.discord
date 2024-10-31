import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('')
    public async registerUser() {
        return await this.authService.login({ password: '123', username: '213' });
    }

    // @Post('login')
    // async login(@Body() loginDto: LoginDto) {
    //     console.log('loginDto', loginDto);
    //     // return this.authService.login(loginDto);
    //     return {};
    // }
}
