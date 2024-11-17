import { HttpException } from '@nestjs/common';
import { ResponseHandler } from '../../helpers/response-handler.helper';
export class BadRequestExceptionCustom extends HttpException {
    constructor(protected responseBody: ResponseHandler = ResponseHandler.BadRequest('unkown request')) {
        super(responseBody.errors, responseBody.statusCode);
    }

    
}
