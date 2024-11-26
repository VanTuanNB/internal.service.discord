import { BadRequestException, Catch, HttpException, HttpStatus, type ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import type { Response } from 'express';
import { ResponseHandler } from '../helpers/response-handler.helper';
import type { IResponseServer } from '../interfaces/common.interface';
import { BadRequestExceptionCustom } from './customs/bad-exception.filter';

@Catch()
export class HttpCatchExceptionFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = this.getStatusCode(exception);
        const requestId = null;
        const permissionCode = null;

        let message = this.getErrorMessage(exception);
        let errors = this.getErrors(exception);

        // if (exception instanceof BadRequestExceptionCustom || exception instanceof InternalServerErrorException) {
        //     message = exception.message;
        //     errors = [{ code: exception.getResponse()?.toString(), message: exception.message }];
        // }

        const errorResponse: IResponseServer<null> = {
            statusCode: status,
            isSuccess: false,
            data: null,
            message: message,
            errors: errors,
            requestId: requestId,
            permissionCode: permissionCode,
            version: '1.0.0',
        };
        if (exception['data']) {
            errorResponse.data = exception['data'];
        }
        if (exception instanceof BadRequestException) {
            const errorMessage = exception['response'].message;
            const baseErr = new ResponseHandler(status, false, null, errorMessage);

            errorResponse.message = typeof errorMessage == 'string' ? errorMessage : errorMessage.join(', ');
            errorResponse.errors = baseErr.errors;
        }
        response.status(status).json(errorResponse);
    }

    private getStatusCode = (exception: any): number => {
        const statusCode =
            exception instanceof HttpException
                ? exception.getStatus()
                : exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception instanceof BadRequestExceptionCustom) {
            return statusCode;
        }
        return statusCode == 400 ? 200 : statusCode;
        // convert statusCode = 200 if status is 400 (BadRequest)
    };

    private getErrorMessage = (exception: any): string => {
        return exception?.message || String(exception);
    };

    private getErrors = (exception: any): any[] => {
        return (
            exception['errors'] || [
                {
                    code: exception['code'],
                    message: exception['message'],
                },
            ]
        );
    };
}
