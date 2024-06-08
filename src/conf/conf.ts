import dotenv from 'dotenv'

dotenv.config({
    path:'./.env'
})

export const conf={
    postgresUrl : String(process.env.POSTGRES_URL),
    postgresUserName: String(process.env.POSTGRES_USER),
    postgresPassword: String(process.env.POSTGRES_PASSWORD),
    postgresHost: String(process.env.POSTGRES_HOST),
    postgresDatabase: String(process.env.POSTGRES_DATABASE),
    port: Number(process.env.POSTGRES_PORT)
}