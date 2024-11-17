import { HttpStatus } from '@nestjs/common';
import type { IResponseServer } from '../interfaces/common.interface';

export class ResponseHandler<T = any> implements IResponseServer<T> {
    public version = '1.0.0';
    constructor(
        public statusCode: number,
        public isSuccess: boolean,
        public data: T,
        public message: string,
        public errors?: any,
    ) {}

    public static InternalServer() {
        return {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            isSuccess: false,
            message: 'Internal Server Error',
            data: null,
            errors: null,
            version: '1.0.0',
        };
    }

    public static Unauthorized() {
        return {
            statusCode: HttpStatus.UNAUTHORIZED,
            isSuccess: false,
            message: 'Unauthorized',
            data: null,
            errors: null,
            version: '1.0.0',
        };
    }

    public static ForbiddenAccess() {
        return {
            statusCode: HttpStatus.FORBIDDEN,
            isSuccess: false,
            message: 'Forbidden Access',
            data: null,
            errors: null,
            version: '1.0.0',
        };
    }

    public static EndpointNotFound() {
        return {
            statusCode: HttpStatus.NOT_FOUND,
            isSuccess: false,
            message: 'Endpoint Not Found',
            data: null,
            errors: null,
            version: '1.0.0',
        };
    }

    public static BadRequest(errors: any) {
        return {
            statusCode: HttpStatus.BAD_REQUEST,
            isSuccess: false,
            message: 'Bad Request',
            data: null,
            errors: errors,
            version: '1.0.0',
        };
    }
}
