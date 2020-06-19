import mongoose from 'mongoose'

// 서 로그를 만들 때 들어가는 타입
interface LogAttrs {
  robotName: string
  status: string
  destination: string
}

// model우 타입
interface LogModel extends mongoose.Model<LogDoc> {
  build(attrs: LogAttrs): LogDoc
}

// document의 타입
interface LogDoc extends mongoose.Document {
  robotName: string
  status: string
  destination: string
  orderedAt: string
}

const logSchema = new mongoose.Schema({
  robotName: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  orderedAt: {
    type: Date,
    default: Date.now,
  },
})
logSchema.statics.build = (attrs: LogAttrs) => new Log(attrs)

const Log = mongoose.model<LogDoc, LogModel>('Log', logSchema)

export { Log }
