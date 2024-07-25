// emailService.js

const nodemailer = require('nodemailer');
const middlewares = require('../middlewares/utils');

const config = require('../config');

const subject = `App started notification`;

const text = `
Node.js app ${middlewares.appName} has started successfully.


IP: ${middlewares.ipMiddleware},
Time: ${middlewares.nowMiddleware},
Server: ${middlewares.nodeMiddleware},
OS: ${middlewares.osMiddleware},
Memory: ${middlewares.memoryMiddleware},
CPUs: ${middlewares.cpuMiddleware.length},
Uptime: ${middlewares.uptimeMiddleware}
Arch: ${middlewares.archMiddleware},
Type: ${middlewares.typeMiddleware},
`;

const sender = config.EMAIL.GMAIL_SENDER;
const senderName = config.EMAIL.GMAIL_SENDER_NAME;
const senderAppPassword = config.EMAIL.GMAIL_SENDER_APP_PASSWORD;


const recivers = [
    config.EMAIL.GMAIL_RECIVER_1,
    // config.EMAIL.GMAIL_RECIVER_2,
    // config.EMAIL.GMAIL_RECIVER_3,
]

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: sender,
    pass: senderAppPassword,
  }
});

async function sendEmail(to, subject, text) {
  try {
    let info = await transporter.sendMail({
      from: `${senderName} <${sender}>`,
      to,
      subject,
      text
    });
    middlewares.llog(`Email sent ${info.messageId}`);
  } catch (error) {
    middlewares.llog(`Error occurred while sending email: ${error}`, 'red', 'error');
  }
}


// for (let reciver of recivers) {
//     sendEmail(reciver, subject, text);
// }

module.exports = { sendEmail };
