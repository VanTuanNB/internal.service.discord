import { Injectable, Scope } from '@nestjs/common';
import { ResponseHandler } from '../../../core/common/helpers/response-handler.helper';
import { PrismaService } from '../../../databases/prisma.service';
import type { LoginDto } from '../dto/login.dto';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
    public count = 1;
    constructor(private readonly prismaService: PrismaService) {
        this.count += 1;
    }

    async login(loginDto: LoginDto) {
        try {
            const user = await this.prismaService.servers.findMany();

            return new ResponseHandler(200, true, null, 'testing');
        } catch (error) {
            console.log('error', error);
        }
    }
}
