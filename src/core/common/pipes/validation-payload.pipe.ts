import { type ArgumentMetadata, type PipeTransform, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BadRequestExceptionCustom } from '../filters/customs/bad-exception.filter';
import type { IMessageError } from '../interfaces/common.interface';

@Injectable()
export class ValidationPipe implements PipeTransform {
    public async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype) return value;
        const object = plainToInstance(metatype, value);
        const validation = await validate(object, {
            // Tắt thông báo lỗi mặc định của class-validator
            // validationError: false,
            // // Loại bỏ các thuộc tính không được định nghĩa trong DTO class
            whitelist: true,
            // // Bật chế độ debug để hiển thị thông báo chi tiết hơn khi có lỗi
            // enableDebugMessages: true,
            // // Đảm bảo validation groups được áp dụng một cách nghiêm ngặt
            // strictGroups: true,
            // // Không cho phép các giá trị không xác định trong quá trình validation
            // forbidUnknownValues: true,
            // // Ném ra lỗi nếu có thuộc tính không được khai báo trong DTO
            // forbidNonWhitelisted: true,
            // Tự động chuyển đổi kiểu dữ liệu theo định nghĩa trong DTO
            transform: true,
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
                        code: 'unknown',
                        message: 'Unkown error',
                    },
                ];
            const { constraints } = error;
            const firstKey = Object.keys(constraints as Object)[0];
            const message = (constraints as any)[firstKey];

            return [
                {
                    code: error.property,
                    message,
                },
            ];
        } catch (error) {
            return [
                {
                    code: 'unknown',
                    message: JSON.stringify(error),
                },
            ];
        }
    }
}
