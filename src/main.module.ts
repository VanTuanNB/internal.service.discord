import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { AppModule } from './modules/app.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
    imports: [PrismaModule, AppModule, CoreModule],
})
export class MainModule {}
