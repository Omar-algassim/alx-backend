import redis from 'redis';
import { promisify } from 'util';
const client = redis.createClient();

client.on('error', (err) => {
  console.error(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

function setNewSchool(scoolName, value) {
    client.set(scoolName, value, redis.print);
}

const displaySchoolValue = async (schoolName) => {  
  console.log(await promisify(client.get).bind(client)(schoolName));
};
