#!/usr/bin/node
import redis from 'redis';
import kue from 'kue';
import { promisify } from 'util';

const client = redis.createClient();
const queue = kue.createQueue();
let reservationEnabled = true;

client.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
});
client.on('connect', () => {
    console.log('Redis client connected to the server');
});

function reserveSeat(number) {
    client.set('available_seats', number, redis.print);
    }

async function getCurrentAvilableSeate() {
    const get = promisify(client.get).bind(client);
    return await get('available_seats');
}

app.get('/available_seats', async (req, res) => {
    const availableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats: availableSeats });
  });
  
  
  app.get('/reserve_seat', async (req, res) => {
    if (!reservationEnabled) {
      res.json({ status: 'Reservation are blocked' });
      return;
    }
    const job = queue.create('reserve_seat').save((err) => {
      if (err) {
        res.json({ status: 'Reservation failed' });
      } else {
        res.json({ status: 'Reservation in process' });
        job.on('complete', () => console.log(`Seat reservation job ${job.id} completed`)).on('failed', (err) => console.log(`Seat reservation job ${job.id} failed: ${err}`));
      }
    });
  });
  
  app.get('/process', (req, res) => {
    queue.process('reserve_seat', async (job, done) => {
      const availableSeats = Number(await getCurrentAvailableSeats());
      if (availableSeats === 0) {
        reservationEnabled = false;
        done(Error('Not enough seats available'));
      } else {
        reserveSeat(availableSeats - 1);
        done();
      }
    });
    res.json({ status: 'Queue processing' });
  });
  
  app.listen(1245, () => {
    reserveSeat(50);
  });