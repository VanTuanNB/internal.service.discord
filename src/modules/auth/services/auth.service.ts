import { Injectable } from '@nestjs/common';
import type { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
    async login(loginDto: LoginDto) {
        // Xử lý logic đăng nhập tại đây
        return { message: 'Logged in successfully' };
    }
}
