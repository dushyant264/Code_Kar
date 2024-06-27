const { createClient } =require('redis');

// Create a Redis client
const redisClient = createClient({
    password: process.env.PASS || '8nnhsavjdWyv3OmThnrwaDoOEmdsYogv',
    socket: {
        host: process.env.HO || 'redis-12093.c285.us-west-2-2.ec2.redns.redis-cloud.com',
        port: process.env.PO || 12093
    }
});

// Handle Redis connection errors
redisClient.on('error', (err) => {
  console.log('Redis Connection Error:', err);
});

// Handle successful Redis connection
redisClient.on('connect', () => {
  console.log('Redis Connected Successfully');
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error('Error connecting to Redis:', err);
  }
})();

module.exports = redisClient;
