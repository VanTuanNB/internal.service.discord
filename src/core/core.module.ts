import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CatchExceptionFilter } from './common/filters/catch-exception.filter';
@Module({
    providers: [
        {
            provide: APP_FILTER,
            useClass: CatchExceptionFilter,
        },
    ],
    exports: [],
})
export class CoreModule {}
