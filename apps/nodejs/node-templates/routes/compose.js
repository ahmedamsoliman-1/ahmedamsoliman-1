const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const middlewares = require('../middlewares/utils');
const SVGs = require('../SVGs')




function locateComposeFiles(directory) {
    let composeFiles = [];
    fs.readdirSync(directory).forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            // Recursively search directories
            composeFiles = composeFiles.concat(locateComposeFiles(filePath));
        } else if (file.endsWith('.yml') || file.endsWith('.yaml') || file.endsWith('.conf') ) {
            // Found a Docker Compose file
            composeFiles.push(filePath);
        }
    });
    return composeFiles;
}



function listRunningContainers(callback) {
    // Check if Docker is installed
    exec('docker --version', (error, stdout, stderr) => {
        if (error) {
            // Docker is not installed or not found
            console.error('Docker is not installed or not found.');
            // You can prompt the user to install Docker or handle the error accordingly
            return callback(new Error('Docker is not installed or not found.'), null);
        }

        // Docker is installed, check if Docker daemon is running
        exec('docker info', (error, stdout, stderr) => {
            if (error && error.code === 1 && stderr.includes("Cannot connect to the Docker daemon")) {
                // Docker daemon is not running, attempt to start it
                console.log('Docker daemon is not running. Attempting to start...');
                exec('open -a Docker', (error, stdout, stderr) => {
                    if (error) {
                        console.error('Error starting Docker daemon:', stderr || error);
                        return callback(new Error('Error starting Docker daemon.'), null);
                    }
                    console.log('Docker daemon started successfully.');
                    // Proceed to list running containers
                    listContainers(callback);
                });
            } else if (error) {
                console.error('Error checking Docker info:', stderr || error);
                return callback(new Error('Error checking Docker info.'), null);
            } else {
                // Docker daemon is already running, proceed to list running containers
                listContainers(callback);
            }
        });
    });
}

function listContainers(callback) {
    exec('docker ps -a --format "{{.Names}}|{{.Status}}"', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error listing Docker containers: ${error}`);
            return callback(error, null);
        }

        const containers = stdout.split('\n').filter(Boolean).map(async (line) => {
            const [name, status] = line.split('|');
            const ports = await getContainerPorts(name);
            return { name, status, ports };
        });

        Promise.all(containers).then((result) => {
            callback(null, result);
        }).catch((err) => {
            console.error(`Error fetching port/host information: ${err}`);
            callback(err, null);
        });
    });
}


function getContainerPorts(containerName) {
    return new Promise((resolve, reject) => {
        exec(`docker inspect "${containerName}" | jq -r '.[].NetworkSettings.Ports'`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error fetching host port for container ${containerName}: ${error}`);
                reject(error);
                return;
            }
            if (stderr) {
                console.error(`Error fetching host port for container ${containerName}: ${stderr}`);
                reject(stderr);
                return;
            }
            const ports = JSON.parse(stdout);
            resolve(ports);
        });
    });
}





router.get('/docker-compose', (req, res) => {
  const composeFilesDirectory = './docker/compose';
  const configFilesDirectory = './docker/config';
  const compose = locateComposeFiles(composeFilesDirectory);
  const config = locateComposeFiles(configFilesDirectory);


  listRunningContainers((error, containers) => {
      if (error) {
        res.status(500).send('Error listing Docker containers.');
        return;
      }

      res.render('docker-compose/compose', {
        user: req.user,
        time: new Date(),
        pageTitle: 'Compose',
        composeFiles: compose.map(file => path.relative(composeFilesDirectory, file)),
        configFiles: config.map(file => path.relative(configFilesDirectory, file)),
        containers: containers,
        svgs: SVGs,
      });
      res.locals.message = 'Docker Compose Page Rendered';
  });
});






router.post('/docker-compose/run', (req, res) => {
    const selectedComposeFile = req.body.composeFile;
    const composeFilesDirectory = './docker/compose';

    // Execute Docker Compose command using the selected file
    const filePath = path.join(composeFilesDirectory, selectedComposeFile);
    const command = `docker compose -f ${filePath} up -d`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running Docker Compose: ${error}`);
            return res.status(500).send('Error running Docker Compose.');
        }
        res.locals.message = 'Docker Compose Executed Successfully';
        res.redirect('/docker-compose');
    });
});

router.get('/docker-compose/display/:file', (req, res) => {
    const fileName = req.params.file;
    const filePath = path.join(__dirname, '../docker/compose', fileName);

    // Read the content of the Docker Compose file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading Docker Compose file ${fileName}: ${err}`);
            return res.status(500).send('Error reading Docker Compose file.');
        }

        // Render the view with the content of the Docker Compose file
        res.render('docker-compose/display-compose', {
            user: req.user,
            time: new Date(),
            pageTitle: 'Docker Compose File',
            fileName: fileName,
            fileContent: data
        });
    });
});










router.post('/docker-container/stop', (req, res) => {
  const containerName = req.body.containerName;
  exec(`docker stop "${containerName}"`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error stopping container ${containerName}: ${error}`);
          res.status(500).send('Error stopping container.');
          return;
      }
      res.redirect('/docker-compose');
  });
  res.locals.message = 'Docker Container Stopped';
});

router.post('/docker-container/start', (req, res) => {
  const containerName = req.body.containerName;
  exec(`docker start "${containerName}"`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error starting container ${containerName}: ${error}`);
          res.status(500).send('Error starting container.');
          return;
      }
      res.redirect('/docker-compose');
  });
  res.locals.message = 'Docker Container Started';
});


router.post('/docker-container/restart', (req, res) => {
  const containerName = req.body.containerName;
  exec(`docker restart "${containerName}"`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error restarting container ${containerName}: ${error}`);
          res.status(500).send('Error restarting container.');
          return;
      }
      res.redirect('/docker-compose');
  });
  res.locals.message = 'Docker Container Restarted';
});

router.post('/docker-container/delete', (req, res) => {
  const containerName = req.body.containerName;
  exec(`docker rm -f "${containerName}"`, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error deleting container ${containerName}: ${error}`);
          res.status(500).send('Error deleting container.');
          return;
      }
      res.redirect('/docker-compose');
  });
  res.locals.message = 'Docker Container Deleted';
});



router.post('/docker-container/display-compose-logs', (req, res) => {
    const containerName = req.body.containerName;
    // Execute Docker command to fetch logs
    exec(`docker logs "${containerName}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error fetching logs for container ${containerName}: ${error}`);
            res.status(500).send('Error fetching logs.');
            return;
        }
        // console.log(stdout);
        res.render('docker-compose/display-compose-logs', {
            user: req.user,
            time: new Date(),
            pageTitle: 'Docker Compose Logs',
            container: containerName,
            logs: stdout,
        });
        // res.redirect('/docker-compose');
    });
    res.locals.message = 'Docker Container Logs Fetched: ';
});


router.post('/delete-all-docker-containers', (req, res) => {
    listRunningContainers((error, containers) => {
        if (error) {
            res.status(500).send('Error listing Docker containers.');
            return;
        }
        const containerNames = containers.map(container => container.name);
        if (containerNames.length === 0) {
            // No containers found, proceed without sending an error response
            res.redirect('/docker-compose');
            res.locals.message = 'No Docker containers to delete.';
            return;
        }
        const command = `docker rm -f ${containerNames.join(' ')}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                // Check if stderr contains the specific error message
                if (stderr.includes('"docker rm" requires at least 1 argument.')) {
                    // No containers found, proceed without sending an error response
                    res.redirect('/docker-compose');
                    res.locals.message = 'No Docker containers to delete.';
                    return;
                } else {
                    console.error(`Error deleting Docker containers: ${error}`);
                    res.status(500).send('Error deleting Docker containers.');
                    return;
                }
            }
            res.redirect('/docker-compose');
            res.locals.message = 'All Docker containers deleted successfully.';
            return;
        });
    });
});



router.post('/stop-all-docker-containers', (req, res) => {
    stopDockerContainers((error, message) => {
        if (error) {
            console.error(`Error stopping Docker containers: ${error}`);
            res.status(500).send('Error stopping Docker containers.');
            return;
        }
        res.redirect('/docker-compose');
        res.locals.message = message;
    });
});

function stopDockerContainers(callback) {
    listRunningContainers((error, containers) => {
        if (error) {
            callback(error);
            return;
        }

        const containerNames = containers.map(container => container.name);
        if (containerNames.length === 0) {
            callback(null, 'No Docker containers to stop.');
            return;
        }

        const command = `docker stop ${containerNames.join(' ')}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                // Check if stderr contains the specific error message
                if (stderr.includes('"docker stop" requires at least 1 argument.')) {
                    callback(null, 'No Docker containers to stop.');
                    return;
                } else {
                    callback(error);
                    return;
                }
            }
            callback(null, 'All Docker containers stopped successfully.');
        });
    });
}



router.post('/start-all-docker-containers', (req, res) => {
    const composeFilesDirectory = './docker/compose';
    const compose = locateComposeFiles(composeFilesDirectory);

    let completedCount = 0; // Keep track of completed commands
    let executedFiles = []; // Store names of executed files

    compose.forEach(file => {
        // const filePath = path.join(composeFilesDirectory, file);
        const command = `docker-compose -f ${file} up -d`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error running Docker Compose (${file}): ${error}`);
                return; // Don't send response on error, just log it
            }

            // Store name of executed file
            executedFiles.push(file);

            // Check if all commands have completed
            completedCount++;
            if (completedCount === compose.length) {
                // All commands completed, send response
                res.locals.message = `Docker Compose executed successfully for files: ${executedFiles.join(', ')}`;
                res.redirect('/docker-compose');
            }
        });
    });
});



module.exports = router;
