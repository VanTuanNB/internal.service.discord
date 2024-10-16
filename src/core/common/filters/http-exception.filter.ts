import { type ArgumentsHost, Catch, type ExceptionFilter, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ResponseHandler } from '../helpers/response-handler.helper';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(@Inject(HttpAdapterHost) private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: HttpException, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody = new ResponseHandler(httpStatus, false, null, exception?.message, exception?.getResponse());

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
