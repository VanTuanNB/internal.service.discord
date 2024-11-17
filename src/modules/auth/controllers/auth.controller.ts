import { ValidationPipe } from '@/core/common/pipes/validation-payload.pipe';
import { Body, Controller, Post } from '@nestjs/common';
import type { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body(new ValidationPipe()) loginDto: LoginDto) {
        console.log('loginDto', loginDto);
        return await this.authService.login(loginDto);
    }
}
