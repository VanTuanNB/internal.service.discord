import { type ArgumentMetadata, type PipeTransform, Global, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BadRequestExceptionCustom } from '../filters/customs/bad-exception.filter';
import type { IMessageError } from '../interfaces/common.interface';

@Global()
@Injectable()
export class ValidationPipe implements PipeTransform {
    public async transform(value: any, { metatype, type, data }: ArgumentMetadata) {
        if (!metatype) return value;
        const object = plainToInstance(metatype, value);
        const validation = await validate(object, {
            validationError: false,
            enableDebugMessages: true,
            strictGroups: true,
            forbidUnknownValues: true,
        });
        if (validation.length > 0) {
            throw new BadRequestExceptionCustom(this.getMessageError(validation));
        }
        return value;
    }

    private getMessageError(errors: ValidationError[]): IMessageError[] {
        try {
            const [error] = errors;
            if (!error)
                return [
                    {
                        field: 'unknown',
                        message: 'Unkown error',
                    },
                ];
            const { constraints } = error;
            const firstKey = Object.keys(constraints as Object)[0];
            const message = (constraints as any)[firstKey];

            return [
                {
                    field: error.property,
                    message,
                },
            ];
        } catch (error) {
            return [
                {
                    field: 'unknown',
                    message: JSON.stringify(error),
                },
            ];
        }
    }
}
