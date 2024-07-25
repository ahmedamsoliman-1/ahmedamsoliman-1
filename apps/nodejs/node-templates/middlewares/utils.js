const { logToCassandra } = require('../db/cassandra/cassandra');
const moment = require('moment');
const axios = require('axios');

const config = require('../config');


// const logService = require('../services/logService');


function addTimestamp(req, res, next) {
  const timestamp = Date.now();
  req.timestamp = new Date(timestamp).toLocaleString();
  next();
}





function extractAgent(userAgent) {
  if (userAgent.includes('Macintosh')) {
    if (userAgent.includes('Edg')) {
      return 'Edge agent - Macintosh';
    }
    else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg')) {
      return 'Chrome agent - Macintosh';
    }
    else if (!userAgent.includes('Chrome/') && !userAgent.includes('Edg')) {
      return 'Safari agent - Macintosh';
    } else {
      return 'Macintosh Browser';
    }
  }
  else if (userAgent.includes('Win64')) {
    if (userAgent.includes('Edg')) {
      return 'Edge agent - Windows';
    }
    else if (userAgent.includes('Chrome/') && !userAgent.includes('Edg')) {
      return 'Chrome agent - Windows';
    }
    else if (!userAgent.includes('Chrome/') && !userAgent.includes('Edg')) {
      return 'Safari agent - Windows';
    } else {
      return 'Windows Browser';
    }
  } else if (userAgent.includes('Android')) {
    return 'Android';
  } else if (userAgent.includes('curl') || userAgent.includes('PowerShell') || userAgent.includes('ApacheBench')) {
    return 'Curl/PowerShell/ApacheBench';
  } else if (userAgent.includes('Prometheus')) {
    return 'Prometheus/2.48.1';
  } else if (userAgent.includes('Postman')) {
    return userAgent;
  } else {
    return 'Unknown Agent';
  }
}




function logger(req, res, next) {
  res.on('finish', () => {
    const time = `${colorMiddleware.magenta}${req.timestamp}${colorMiddleware.reset}`;
    const method = `${colorMiddleware.yellow}${req.method}${colorMiddleware.reset}`;
    const ip = `${colorMiddleware.green}${req.ip}${colorMiddleware.reset}`;
    const originalUrl = `${colorMiddleware.green}${req.originalUrl}${colorMiddleware.reset}`;
    const message = `${colorMiddleware.cyan}${res.locals.message}${colorMiddleware.reset}`;
    const host = nodeMiddleware;
    
    let logged_in_user;
    if (req.user) {
      logged_in_user = req.user.username;
    } else {
      logged_in_user = "N/A"
    }

    const userAgent = `${colorMiddleware.red}${extractAgent(req.headers['user-agent'] || 'Unknown')}${colorMiddleware.reset}`;
    if (userAgent === 'Unknown' && req.headers['x-forwarded-for']) {
      userAgent = `${colorMiddleware.green}${req.headers['x-forwarded-for']}${colorMiddleware.reset}`;
    }

    const url = req.originalUrl;
    if (!url.endsWith('.css') && !url.endsWith('.png') && !url.endsWith('.jpg') && !url.endsWith('.jpeg') && !url.endsWith('.js')) {
      console.log(`${time} - ${method} - ${ip}${originalUrl} - Message: ${message} - Agent: ${userAgent} - User: ${logged_in_user}`);
    }    

    const db_payload = [req.timestamp, req.method, req.ip, req.originalUrl, res.locals.message, extractAgent(req.headers['user-agent'] || 'Unknown'), host]

    const payload = {
      timestamp: req.timestamp,
      method: req.method,
      url: clearURL(req.originalUrl),
      full_url: req.originalUrl,
      ip: req.ip,
      message: message,
      agent: extractAgent(req.headers['user-agent'] || 'Unknown'),
      host: host
    }
    // try {
    //   logToCassandra(payload);
    //   // logService.logsToElastic(payload);
    // } catch (error) {
    //   console.error('Error inserting logs:', error);
    // }
    
  });
  next();
}





function handleError(error, req, res, next) {
  console.log(error)
  res.sendStatus(500);
}



function clearURL(url) {
  if (url.includes('?')) {
    return url.split('?')[0];
  }
  return url;
}





function clearLogs(log) {
  const customEscapeCodesPattern = new RegExp(
    Object.values(colorMiddleware)
      .map((color) => color.replace(/\[/g, '\\['))
      .join('|'),
    'g'
  );
  return log.replace(customEscapeCodesPattern, '');
}

function llog (original_log, colour, log_category) {
  let cat;
  switch (true) {
    case log_category === 'ES':
      cat = 'Elastic Search';
      break;
    case log_category === 'CRON':
      cat = 'Cron Job';
      break;
    case log_category === 'Redis':
      cat = 'Redis';
      break;
    case log_category === 'Cassandra':
      cat = 'Cassandra';
      break;
    case log_category === 'info':
      cat = 'INFO';
      break;
    case log_category === 'error':
      cat = 'ERROR';
      break;
    case log_category === 's3':
      cat = 'S3';
      break;
    case log_category === 'aws':
      cat = 'AWS';
      break;
    case log_category === 'queue':
      cat = 'QUEUE';
      break;
    case log_category === 'rabbit':
      cat = 'RABBIT';
      break;
    case log_category === 'GCP' || log_category === 'gcp':
      cat = 'GCP';
      break;
    default:
      cat = 'LOG';
      break;
  }

  let category;
  switch (true) {
    case log_category === 'error':
      category = `${colorMiddleware.red}${cat} ::${colorMiddleware.reset}`;
      break;
    case log_category === 'info':
      category = `${colorMiddleware.cyan}${cat} ::${colorMiddleware.reset}`;
      break;
    default:
      category = `${colorMiddleware.yellow}${cat} ::${colorMiddleware.reset}`;
      break;
  }

  const time = `${colorMiddleware.magenta}${nowMiddleware}${colorMiddleware.reset}`;
  const host = `${colorMiddleware.black}host: ${nodeMiddleware}${colorMiddleware.reset}`;

  switch (true) {
    case colour === 'red':
      logs = `${colorMiddleware.red}${original_log}${colorMiddleware.reset}`;
      break;
    case colour === 'green':
      logs = `${colorMiddleware.green}${original_log}${colorMiddleware.reset}`;
      break;
    case colour === 'yellow':
      logs = `${colorMiddleware.yellow}${original_log}${colorMiddleware.reset}`;
      break;
    case colour === 'magenta':
      logs = `${colorMiddleware.magenta}${original_log}${colorMiddleware.reset}`;
      break;
    case colour === 'cyan':
      logs = `${colorMiddleware.cyan}${original_log}${colorMiddleware.reset}`;
      break;
    default:
      logs = `${original_log}${colorMiddleware.reset}`;
      break;
  }

  console.log(`${time} - ${category} ${logs} - ${host}`);

  const payload = {
    timestamp: nowMiddleware,
    category: log_category,
    log: clearLogs(original_log),
    host: nodeMiddleware,
    ip: ipMiddleware,
    os: osMiddleware,
    memory: memoryMiddleware,
    cpus: cpuMiddleware.length,
    uptime: uptimeMiddleware,
    arch: archMiddleware,
    release: releaseMiddleware,
    type: typeMiddleware,
  };

};


colorMiddleware = {
  magenta: '\x1b[35m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m',
  black: '\x1b[30m',
}






const nowMiddleware = moment().format('MM/DD/YYYY, h:mm:ss A');
const nodeMiddleware = require('os').hostname();
const ipMiddleware = require('ip').address();
const osMiddleware = require('os').platform();
const memoryMiddleware = require('os').totalmem();
const cpuMiddleware = require('os').cpus();
const uptimeMiddleware = require('os').uptime();
const archMiddleware = require('os').arch();
const releaseMiddleware = require('os').release();
const typeMiddleware = require('os').type();

const appName = config.APP_NAME;



module.exports = {
  addTimestamp,
  logger,
  handleError,
  llog,

  colorMiddleware,
  nowMiddleware,
  nodeMiddleware,
  ipMiddleware,
  osMiddleware,
  memoryMiddleware,
  cpuMiddleware,
  uptimeMiddleware,
  archMiddleware,
  releaseMiddleware,
  typeMiddleware,
  appName,

};


