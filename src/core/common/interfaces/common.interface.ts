export interface IResponseServer<T = any> {
    isSuccess: boolean;
    statusCode: number;
    data:
        | T
        | {
              items: T[];
              totalItems: number;
              totalPages: number;
              page: number;
              limit: number;
          };
    message: string;
    version: string;
}

export type IMessageError = {
    field: string;
    message: string;
};
