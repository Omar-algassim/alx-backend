#!/usr/bin/node

function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');
  jobs.forEach((job) => {
    const jobA = queue.create('push_notification_code_2', job)
      .save((err) => {
        if (!err) console.log(`Notification job created: ${jobA.id}`);
      });
    jobA.on('complete', () => {
      console.log(`Notification job ${jobA.id} completed`);
    });
    jobA.on('failed', (err) => {
      console.log(`Notification job ${jobA.id} failed: ${err}`);
    });
    jobA.on('progress', (progress) => {
      console.log(`Notification job ${jobA.id} ${progress}% complete`);
    });
  });
}

export default createPushNotificationsJobs;
