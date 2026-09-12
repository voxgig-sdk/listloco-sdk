import { Context } from './Context';
declare class ListlocoError extends Error {
    isListlocoError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ListlocoError };
