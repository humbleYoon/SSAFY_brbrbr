import express from 'express'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import dotenv from 'dotenv'
import passport from 'passport'
import hpp from 'hpp'
import helmet from 'helmet'
import socketio from 'socket.io'
import mongoose from 'mongoose'

import socketMain from './socketMain'

import eventRouter from './routes/event'
import placeRouter from './routes/place'
import robotRouter from './routes/robot'
import searchRouter from './routes/search'

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '.env.prod') })
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: path.join(__dirname, '.env') })
} else {
  throw new Error('process.env.NODE_ENV를 설정하지 않았습니다!')
}

const app = express()
const prod = process.env.NODE_ENV === 'production'

app.set('port', prod ? process.env.PORT : 3064)

if (prod) {
  app.use(hpp())
  app.use(helmet())
  app.use(morgan('combined'))
  app.use(
    cors({
      origin: '*', // reqexp will match all prefixes
      methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
      credentials: true, // required to pass
      allowedHeaders:
        'Origin, Accept, Content-Type, Authorization, X-Requested-With, authCode',
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
app.use(express.urlencoded({ extended: true }))
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
app.use('/api/v1/events', eventRouter)
app.use('/api/v1/places', placeRouter)
app.use('/api/v1/robots', robotRouter)
app.use('/api/v1/searchs', searchRouter)

const server = app.listen(app.get('port'), () => {
  console.log(`${app.get('port')} 포트에 연결되었습니다.`)
})

const startMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('MongoDB와 연결되었습니다')
  } catch (error) {
    console.error(error)
  }
}

startMongo()
const io = socketio(server)
app.set('io', io)

io.sockets.on('connect', async (socket) => {
  app.set('socket', socket)

  socketMain(io, socket)
})

io.origins(process.env.SOCKET_CLIENT_HOST!)
