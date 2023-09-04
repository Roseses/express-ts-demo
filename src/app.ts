// src/app.ts

import express, {Request, Response} from 'express'
import routes from './routes' // 路由
import logger from './utils/logger'
import config from 'config'
import commonRes from './utils/commonRes'
import silentHandle from './utils/silentHandle'
import initMiddleware from './middleware'

const app = express()
initMiddleware(app)
app.use(express.json())

const PORT = config.get<number>('port')

const getInfo = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > .5 ? resolve('info...') : reject('error...')
        }, 500)
    })
}

app.get('/', async (req: Request, res: Response) => {
    const [e, result] = await silentHandle(getInfo)
    e ? commonRes.error(res, null) : commonRes(res, { result })
})


// 启动
app.listen(PORT, async () => {
    logger.info(`App is running at http://localhost:${PORT}`)
    routes(app)
})

