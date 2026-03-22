export type ServiceGatewayResponse<T> = {
    statusCode: number;
    data?: T;
    error?: SerializedError;
};
/**
 * クライアント側にErrorオブジェクトをシリアライズして送信するための型
 */
export type SerializedError = {
    name: string;
    statusCode: number;
    message: string;
    stack: string;
};
//# sourceMappingURL=types.d.ts.map