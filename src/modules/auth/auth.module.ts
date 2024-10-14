import { Module } from '@nestjs/common';
import { CoreModule } from '../../core/core.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
    imports: [CoreModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
