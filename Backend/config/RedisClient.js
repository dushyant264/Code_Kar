const { createClient } =require('redis');

// Create a Redis client
const redisClient = createClient({
  password: process.env.REDIS_PASSWORD || 'fMkVPHt6RJ37C2HjNgnUgB3GiOrSUhw7',
  socket: {
    host: process.env.REDIS_HOST || 'redis-16925.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
    port: process.env.REDIS_PORT ? parseInt(process.env.PO) : 16925,
    keepAlive: true,
    reconnectStrategy: retries => {
      console.warn(`Redis reconnect attempt #${retries}`);
      return Math.min(retries * 100, 2000); // retry with backoff
    },
    // tls: true, // 🚨 Required for Redis Enterprise Cloud (comment out if not)
  },
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
