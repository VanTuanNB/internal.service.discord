import { ResponseHandler } from '@/core/common/helpers/response-handler.helper';
import { Body, Controller, Post } from '@nestjs/common';
import type { LoginDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @Post('pipe')
    async pipe(@Body() a: string) {
        return new ResponseHandler(200, true, null, 'Success', null);
    }
}
