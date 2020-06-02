import mongoose from 'mongoose'

// 서 로그를 만들 때 들어가는 타입
interface LogAttrs {
  robotId: number
  status: string
}

// model우 타입
interface LogModel extends mongoose.Model<LogDoc> {
  build(attrs: LogAttrs): LogDoc
}

// document의 타입
interface LogDoc extends mongoose.Document {
  robotId: number
  status: string
}

const logSchema = new mongoose.Schema({
  robotId: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})
logSchema.statics.build = (attrs: LogAttrs) => new Log(attrs)

const Log = mongoose.model<LogDoc, LogModel>('Log', logSchema)

export { Log }
