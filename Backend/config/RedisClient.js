const { createClient } =require('redis');

// Create a Redis client
const redisClient = createClient({
    password: process.env.PASS || 'fMkVPHt6RJ37C2HjNgnUgB3GiOrSUhw7',
    socket: {
        host: process.env.HO || 'redis-16925.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: process.env.PO || 16925
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
