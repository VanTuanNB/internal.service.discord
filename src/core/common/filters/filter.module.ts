import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { CatchExceptionFilter } from './catch-exception.filter';
import { BadRequestExceptionCustom } from './customs/bad-exception.filter';

@Module({
    providers: [
        BadRequestExceptionCustom,
        // {
        //     provide: APP_FILTER,
        //     useClass: HttpExceptionFilter,
        // },
        {
            provide: APP_FILTER,
            useClass: CatchExceptionFilter,
        },
    ],
})
export class FiltersModule {}
