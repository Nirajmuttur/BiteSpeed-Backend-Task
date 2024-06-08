type HttpStatusCode = number;

class ApiError extends Error{
    statusCode: HttpStatusCode;
    errors: any[];
    data: any;
    success: boolean;
    constructor(statusCode: HttpStatusCode,message:string="Something Went wrong",errors:any[]=[],stack:string="",data:any=""){
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export {ApiError}