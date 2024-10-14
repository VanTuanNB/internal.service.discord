import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor() {}

    @Get('testing')
    private async testing() {
        return {
            haha: 'testing',
        };
    }

    // @Post('login')
    // private async login(@Body() loginDto: LoginDto) {
    //     return this.authService.login(loginDto);
    // }
}
