import { Injectable, type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import type { ResponseHandler } from '../helpers/response-handler.helper';
// sample template file
// @Global()
@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, ResponseHandler<T>> {
    constructor() {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseHandler<T>> {
        const response = context.switchToHttp().getResponse();
        return next.handle().pipe(
            map((data) => {
                return data;
                // return data;
                // return {
                //     statusCode: context.switchToHttp().getResponse().statusCode,
                //     isSuccess: context.switchToHttp().getResponse().isSuccess,
                //     message: context.switchToHttp().getResponse().message,
                //     permissionCode: context.switchToHttp().getResponse().permissionCode,
                //     requestId: context.switchToHttp().getResponse().requestId,
                //     version: context.switchToHttp().getResponse().version,
                //     data,
                // };
            }),
            catchError((err) => throwError(err)),
        );
    }
}
