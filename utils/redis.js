const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.success = true;
    this.client.on('error', (err) => {
      console.error(`Redis client not connected to the server: ${err.message}`);
      this.success = false;
    });
  }

  isAlive() {
    return this.success;
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        this.client.expire(key, duration);
        resolve(reply);
      });
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(reply);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        resolve(reply);
      });
    });
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
