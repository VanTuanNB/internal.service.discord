import { Injectable, type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    statusCode: number;
    message: string;
    data: T;
}
// sample template file
@Injectable()
export class ResponseTransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private reflector: Reflector) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        console.log('context', context);
        return next.handle().pipe(
            map((data) => {
                return {
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    message: this.reflector.get<string>('response_message', context.getHandler()) || '',
                    data,
                };
            }),
        );
    }
}
