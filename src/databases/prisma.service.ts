import { Injectable, Logger, type INestApplication, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger(PrismaService.name);
    constructor() {
        super({
            log: [
                {
                    emit: 'event',
                    level: 'query',
                },
                {
                    emit: 'event',
                    level: 'error',
                },
                {
                    emit: 'event',
                    level: 'info',
                },
                {
                    emit: 'event',
                    level: 'warn',
                },
            ],
        });
    }
    async onModuleInit() {
        await this.$connect();
        this.$on('error' as never, ({ message }: { message: any }) => {
            this.logger.error(message);
        });
        this.$on('warn' as never, ({ message }) => {
            this.logger.warn(message);
        });
        this.$on('info' as never, ({ message }) => {
            this.logger.debug(message);
        });
        this.$on('query' as never, ({ query, params }) => {
            this.logger.log(`${query}; ${params}`);
        });
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit' as never, async () => {
            await app.close();
        });
    }
}
