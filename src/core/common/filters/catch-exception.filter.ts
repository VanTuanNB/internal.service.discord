import {
    type ArgumentsHost,
    BadRequestException,
    Catch,
    type ExceptionFilter,
    HttpException,
    HttpStatus,
    Inject,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type { Response } from 'express';
import { ResponseHandler } from '../helpers/response-handler.helper';

@Catch()
export class CatchExceptionFilter implements ExceptionFilter {
    constructor(@Inject(HttpAdapterHost) private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: BadRequestException, host: ArgumentsHost): any {
        console.log('exception', exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const httpStatus =
            exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody = new ResponseHandler(httpStatus, false, null, exception?.message, exception);
        response.status(httpStatus).json(responseBody);
    }
}
