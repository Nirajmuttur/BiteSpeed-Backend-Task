import express from 'express';
import { createIdentity } from '../controller/identityController';
import { createIdentityValidation } from '../middlerware/validationMiddleware';
import { identitySchema } from '../validationSchema/identitySchema';
const router=express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Identity:
 *       type: object
 *       properties:
 *         primaryContactId:
 *           type: array
 *         emails: 
 *           type: array
 *         phoneNumbers:
 *           type: array
 *         secondaryContactIds:
 *           type: array
 */

/**
 * @swagger
 * /api/identity:
 *   post:
 *     tags: ['Identity']
 *     description: Create new idenity
 *     consumes: 
 *     - application/json
 *     responses:
 *       400:
 *         description: Bad request, invalid input
 *       500:
 *         description: Internal server error
 *       200:
 *         description: Succssfull Response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Identity'
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 */
router.route('/identity').post(createIdentityValidation(identitySchema),createIdentity);

export default router