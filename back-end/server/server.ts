import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import dotenv from 'dotenv'
import passport from 'passport'
import hpp from 'hpp'
import helmet from 'helmet'

import eventRouter from './routes/event'
import placeRouter from './routes/place'
import robotRouter from './routes/robot'

dotenv.config()
const app = express()
const prod = process.env.NODE_ENV === 'production'

app.set('port', prod ? process.env.PORT : 3064)

if (prod) {
  app.use(hpp())
  app.use(helmet())
  app.use(morgan('combined'))
  app.use(
    cors({
      origin: /broom\.com$/,
      credentials: true,
    })
  )
} else {
  app.use(morgan('dev'))
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  )
}

app.use('/', express.static('uploads'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(process.env.COOKIE_SECRET))
// app.use(expressSession({
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.COOKIE_SECRET!,
//     cookie: {
//         httpOnly: true,
//         secure: false,
//         domain: prod ? 'broom.com' : undefined
//     },
//     name: 'rnbck'
// }))
// app.use(passport.initialize())
// app.use(passport.session())
app.use('/events', eventRouter)
app.use('/places', placeRouter)
app.use('/robots', robotRouter)

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} 포트에 연결되었습니다.`)
})