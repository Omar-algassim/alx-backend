#!/usr/bin/node
import createPushNotificationsJobs from './8-job.js';
import kue from 'kue';
import { expect } from 'chai';
import sinon from 'sinon';

queue = kue.createQueue();

Before(function () {
  queue.testMode.enter();
});

afterEach(function () {
    queue.testMode.clear();
});

afterEach(function () {
    queue.testMode.exit();
});

describe('createPushNotificationsJobs', function () {
    it('display a message for each job', function () {
        const consoleSpy = sinon.spy(console, 'log');
        createPushNotificationsJobs([{ phoneNumber: '1234567890', message: 'test message' }], queue);
        sinon.assert.calledWith(consoleSpy, 'Notification job created: 1');
        sinon.assert.calledWith(consoleSpy, 'Notification job 1 completed');
        consoleSpy.restore();
    })
    it('display two messages for each job', function () {
        const consoleSpy = sinon.spy(console, 'log');
        createPushNotificationsJobs([{ phoneNumber: '1234567890', message: 'test message' }, { phoneNumber: '1234567890', message: 'test message' }], queue);
        sinon.assert.calledWith(consoleSpy, 'Notification job created: 1');
        sinon.assert.calledWith(consoleSpy, 'Notification job 1 completed');
        sinon.assert.calledWith(consoleSpy, 'Notification job created: 2');
        sinon.assert.calledWith(consoleSpy, 'Notification job 2 completed');
        consoleSpy.restore();
    })
    it('display a message when jobs is not an array', function () {
        const consoleSpy = sinon.spy(console, 'log');
        createPushNotificationsJobs({ phoneNumber: '1234567890', message: 'test message' }, queue);
        sinon.assert.calledWith(consoleSpy, 'Jobs is not an array');
        consoleSpy.restore();
    })
    it('display message when job is complete', function () {
        const consoleSpy = sinon.spy(console, 'log');
        createPushNotificationsJobs([{ phoneNumber: '1234567890', message: 'test message' }], queue);
        queue.testMode.jobs[1].emit('complete');
        sinon.assert.calledWith(consoleSpy, 'Notification job 1 completed');
        consoleSpy.restore();
    })
    it('display message when job is failed', function () {
        const consoleSpy = sinon.spy(console, 'log');
        createPushNotificationsJobs([{ phoneNumber: '1234567890', message: 'test message' }], queue);
        queue.testMode.jobs[1].emit('failed');
        sinon.assert.calledWith(consoleSpy, 'Notification job 1 failed: undefined');
        consoleSpy.restore();
    })
    it('display message when job is progress', function () {
        const consoleSpy = sinon.spy(console, 'log');
        createPushNotificationsJobs([{ phoneNumber: '1234567890', message: 'test message' }], queue);
        queue.testMode.jobs[1].emit('progress', 50);
        sinon.assert.calledWith(consoleSpy, 'Notification job 1 50% complete');
        consoleSpy.restore();
    })
});
