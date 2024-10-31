import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { PrismaModule } from './databases/prisma.module';
import { AppModule } from './modules/app.module';

@Global()
@Module({
    imports: [PrismaModule, AppModule, CoreModule, ConfigModule.forRoot()],
    providers: [],
})
export class MainModule {}
