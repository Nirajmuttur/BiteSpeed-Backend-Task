import { NextFunction, Request, Response } from 'express'
import {AnySchema} from 'yup'
import { asyncHandler } from '../utils/asyncHandler'
import { ApiError } from '../utils/ApiError'

export const createIdentityValidation=(schema:AnySchema)=>asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        await schema.validate(req.body,{abortEarly:false})
        next()
    } catch (error:any) {
        throw new ApiError(400,error.errors)
    }
})