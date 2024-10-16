import { Controller, Get } from '@nestjs/common';
import type { AuthService } from '../services/auth.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
        console.log('authService', this.authService);
    }

    @Get('')
    private async registerUser() {
        return {};
    }

    // @Post('login')
    // async login(@Body() loginDto: LoginDto) {
    //     console.log('loginDto', loginDto);
    //     // return this.authService.login(loginDto);
    //     return {};
    // }
}
