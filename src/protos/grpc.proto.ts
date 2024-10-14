import { Transport, type ClientOptions } from '@nestjs/microservices';
import { environment } from '../core/configs/environment.config';

export const microserviceClientOptions: ClientOptions = {
    transport: Transport.TCP,
    options: {
        host: '0.0.0.0',
        port: Number(environment.PORT_GRPC) || 3456,
    },
};
