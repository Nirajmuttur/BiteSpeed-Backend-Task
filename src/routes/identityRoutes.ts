import express from 'express';
import { createIdentity } from '../controller/identityController';
const router=express.Router();

router.route('/identity').post(createIdentity);

export default router