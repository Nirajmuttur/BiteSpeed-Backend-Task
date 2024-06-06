import app from './express'
import dotenv from 'dotenv'

dotenv.config({
  path: './.env'
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`⚙️Server listening on port ${process.env.PORT}`)
})