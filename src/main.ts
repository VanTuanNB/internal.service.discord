import { NestFactory, PartialGraphHost } from '@nestjs/core';
import type { MicroserviceOptions } from '@nestjs/microservices';
import fs from 'fs';
import GracefulShutdown from 'http-graceful-shutdown';
import { HttpCatchExceptionFilter } from './core/common/filters/http-exception.filter';
import { ValidationPipe } from './core/common/pipes/validation-payload.pipe';
import { AppConfigEnum } from './core/configs/app.config';
import { environment } from './core/configs/environment.config';
import { MainModule } from './main.module';
import { microserviceClientOptions } from './protos/grpc.proto';

async function bootstrap() {
    const app = await NestFactory.create(MainModule, {
        abortOnError: false,
        snapshot: true,
        bodyParser: true,
        cors: true,
    });
    app.setGlobalPrefix(AppConfigEnum.PREFIX);
    // app.useGlobalInterceptors(new ResponseTransformInterceptor());
    app.useGlobalFilters(new HttpCatchExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());
    app.connectMicroservice<MicroserviceOptions>(microserviceClientOptions);
    await app.startAllMicroservices();
    const port = Number(environment.PORT_SERVICE) || 5001;

    const server = await app.listen(port, '0.0.0.0');
    function shutDown() {
        console.log('Received kill signal, shutting down gracefully');
        GracefulShutdown(server);

        setTimeout(() => {
            console.log('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 30000);
    }
    process.on('SIGINT', shutDown);
}

bootstrap().catch((err) => {
    fs.writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
    process.exit(1);
});
