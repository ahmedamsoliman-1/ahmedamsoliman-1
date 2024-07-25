// scheduler/scheduler.js
const schedule = require('node-schedule');
const { downloadLogs, deleteLogs } = require('../logs/logService');

const every_day_at_midnight = '0 0 * * *';
const every_five_minutes = '*/5 * * * *';
const every_hour = '0 * * * *';
const every_minutes = '* * * * *';
const weekly = '0 0 * * 0';
const monthly = '0 0 1 * *';
const yearly = '0 0 1 1 *';



schedule.scheduleJob(every_minutes, async () => {
  await downloadLogs();
  await deleteLogs();
});
