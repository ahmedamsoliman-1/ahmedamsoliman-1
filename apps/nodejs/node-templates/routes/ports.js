const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
require('dotenv').config();

function listCurrentUsedPorts(callback) {
  exec('sudo lsof -i -Pn | grep LISTEN', (error, stdout, stderr) => {
    if (error) {
      callback(error);
      return;
    }
    const lines = stdout.split('\n');
    const ports = lines.map(line => {
      const parts = line.split(/\s+/);
      if (parts.length >= 10) {
        return {
          processName: parts[0],
          pid: parts[1],
          user: parts[2],
          fileDescriptor: parts[3],
          ipVersion: parts[4],
          address: parts[8],
          link: parts[8].split(':')[1],
        };
      }
    }).filter(port => port);
    callback(null, ports);
  });
}


router.get('/used-ports', (req, res) => {
  listCurrentUsedPorts((error, ports) => {
    if (error) {
      console.error('Error listing ports:', error);
      res.status(500).send('Error listing ports');
      return;
    }
    res.render('ports', {
      user: req.user, 
      time: new Date(),
      pageTitle: 'Used Ports',
      ports: ports,
    });
    res.locals.message = `Used Ports Main Page Loaded!`;
  });
});

module.exports = router;
