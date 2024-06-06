import express from 'express'
import cors from 'cors'

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({ limit: "20kb" }))

app.get('/', (req, res) => {
    res.send('Hello World')
})

export default app