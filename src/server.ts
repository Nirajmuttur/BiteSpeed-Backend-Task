import { conf } from './conf/conf'
import app from './express'

app.listen(process.env.PORT || 3000, () => {
    console.log(`⚙️Server listening on port ${conf.port}`)
})