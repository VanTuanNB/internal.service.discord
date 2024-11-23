import { HttpException, HttpStatus } from '@nestjs/common';
import type { IMessageError } from '../../interfaces/common.interface';
export class BadRequestExceptionCustom extends HttpException {
    constructor(protected errors: IMessageError[]) {
        super('Bad Request', HttpStatus.BAD_REQUEST, {
            cause: errors,
        });
    }
}
