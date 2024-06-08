import express from 'express';
import { createIdentity } from '../controller/identityController';
import { createIdentityValidation } from '../middlerware/validationMiddleware';
import { identitySchema } from '../validationSchema/identitySchema';
const router=express.Router();

router.route('/identity').post(createIdentityValidation(identitySchema),createIdentity);

export default router