const redis = require('ioredis')

// connection setup

const redisClient = new redis(process.env.REDIS_URI,{
    tls: {
        rejectUnauthorized: false
    }
})

// conn event handlers

redisClient.on('connect',()=>{
    console.log('Redis Connected')
})

redisClient.on('error',(err)=>{
    console.log('Redis Conn error',err)
})

module.exports= redisClient