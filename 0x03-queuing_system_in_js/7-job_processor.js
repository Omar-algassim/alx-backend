#!/usr/bin/node
import kue from 'kue';
const blokedNum = [4153518780, 4153518781];

function sendNotification(phoneNumber, message, job, done) {
  if (blokedNum.includes(phoneNumber)) {
    return done(Error(`Phone number ${phoneNumber} is blocked`));
  }
    job.progress(0, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
}

const queue = kue.createQueue();
queue.process('push_notification_code_2', 2, (job, done) => {
    sendNotification(job.data.phoneNumber, job.data.message, job, done);
    });
    