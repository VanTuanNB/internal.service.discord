import { Injectable } from '@nestjs/common';
import { ResponseHandler } from '../../../core/common/helpers/response-handler.helper';
import { PrismaService } from '../../../databases/prisma.service';
import type { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}

    async login(loginDto: LoginDto) {
        try {
            return new ResponseHandler(200, true, await this.prismaService.testing.fields, 'testing');
        } catch (error) {
            console.log('error', error);
        }
    }
}
