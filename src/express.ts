import express from 'express'
import cors from 'cors'
import errorHandler from './middlerware/errorHandler'
import identityRoutes from './routes/identityRoutes'
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "20kb" }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use('/api',identityRoutes)
app.use(errorHandler)

export default app