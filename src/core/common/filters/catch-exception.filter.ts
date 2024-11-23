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
import type { IMessageError } from '../interfaces/common.interface';

type BadRequestExceptionCustom = BadRequestException & {
    errors: IMessageError[];
};

@Catch()
export class CatchExceptionFilter implements ExceptionFilter {
    constructor(@Inject(HttpAdapterHost) private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: BadRequestExceptionCustom, host: ArgumentsHost): any {
        console.log('exception', exception);
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const httpStatus =
            exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const errors = httpStatus === HttpStatus.BAD_REQUEST ? exception?.errors : exception;
        const responseBody = new ResponseHandler(httpStatus, false, null, exception?.message, errors);
        response.status(httpStatus).json(responseBody);
    }
}
