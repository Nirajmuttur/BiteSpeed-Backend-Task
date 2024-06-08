import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); 

    res.status(err.statusCode || 500).json({
        success: err.success || false,
        message: err.message || 'Internal Server Error',
        errors: err.errors || [],
        data: err.data || null,
    });
};

export default errorHandler;
