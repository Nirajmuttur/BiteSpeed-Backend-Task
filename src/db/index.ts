import {Pool} from 'pg'
import { conf } from '../conf/conf'


const pool = new Pool({
    user: conf.postgresUserName,
    host: conf.postgresHost,
    password: conf.postgresPassword,
    database: conf.postgresDatabase
})

export async function query<T>(text: string, params?: any[]):Promise<T[]> {
    const res = await pool.query(text, params);
    return res.rows;
  }

export default query