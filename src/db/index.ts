import {Pool} from 'pg'
import { conf } from '../conf/conf'


const pool = new Pool({
    user: conf.postgresUserName,
    host: conf.postgresUrl,
    password: conf.postgresPassword,
    database: conf.postgresDatabase
})

export default pool