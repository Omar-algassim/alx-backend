import redis from 'redis';

const client = redis.createClient();

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

const data = {Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2
    };

for (const key in data) {
    client.hset('HolbertonSchools', key, data[key], redis.print);
}

client.hgetall('HolbertonSchools', (err, reply) => {
    if (err) {
      console.log(err);
    } else {
      console.log(reply);
    }
});
