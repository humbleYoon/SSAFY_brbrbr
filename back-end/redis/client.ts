import redis from 'redis'

const redisUrl = process.env.REDIS_URL!

const client = redis.createClient(redisUrl)

export default client
