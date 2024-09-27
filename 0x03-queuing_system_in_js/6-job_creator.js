import kue from 'kue';

const push_notification_code = kue.createQueue();

const data = {
    phoneNumber: '0150',
    message: 'hello employee',
  };

const job = push_notification_code.create('push_notification_code', data)
.save((err) => {
    if (err) console.error(`Notification job failed`);
    else console.log(`Notification job created: ${job.id}`);
});

job.on('complete', () => {
    console.log('Notification job completed');
});

job.on('failed', () => {
    console.log('Notification job failed');
});
