const express = require('express');
const session = require('express-session');
// const statusMonitor = require('express-status-monitor');
// const { measureRequestDuration, exposeMetrics } = require('./monitoring');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.set("view engine", "ejs");

// const { sendEmail } = require('./services/emailService');


app.use(express.static(__dirname + "/public"));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const passport = require('./passportConfig');
const config = require('./config'); 
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000, // Set the expiration time of the session cookie
  },
}));


const host_path = config.HOST_PATH;
app.use(function (req, res, next) {
  res.locals.user = req.user;
  res.locals.aws_user_role = req.aws_user_role,
  next();
});

// require('./scheduler/scheduler');


app.use(passport.initialize());
app.use(passport.session());





const middlewares = require('./middlewares/utils');
app.use(middlewares.logger);
app.use(middlewares.addTimestamp);
app.use(middlewares.handleError);

const authRoutes = require('./routes/authRoutes'); 
app.use(host_path, authRoutes);

const swagger = require('./swagger');
app.use(host_path, swagger);









const git = require('./routes/git/git');
const github = require('./routes/git/github');
const gitlab = require('./routes/git/gitlab');
app.use(host_path, git);
app.use(host_path, github);
app.use(host_path, gitlab);




const gallery = require('./routes/gallery/gallery');
const videos = require('./routes/gallery/videos');
const document = require('./routes/document/document');
app.use(host_path, gallery);
app.use(host_path, videos);
app.use(host_path, document);









const dbs = require('./routes/db/dbs');
const cassandra = require('./routes/db/cassandra');
const cassandraInitializer = require('./db/cassandra/cassandraInitializer');
const es = require("./routes/db/es");
const mongo = require('./routes/db/mongo');
const PostgreSQL = require('./routes/db/PostgreSQL');
app.use(host_path, dbs);
app.use(host_path, cassandra);
app.use(host_path, es);
app.use(host_path, mongo);
app.use(host_path, PostgreSQL);









const queues = require('./routes/queues/queues');
const rabbit = require('./routes/queues/rabbit');
const activemq = require('./routes/queues/activemq');
// const kafka = require('./routes/queues/kafka');
app.use(host_path, queues);
app.use(host_path, rabbit);
app.use(host_path, activemq);
// app.use(host_path, kafka);





const cache = require('./routes/cache/cache');
const redis = require("./routes/cache/redis");
const memcached = require("./routes/cache/memcached");
app.use(host_path, cache);
app.use(host_path, redis);
app.use(host_path, memcached);





const index = require("./routes/index");
const cloud = require('./routes/cloud/cloud');
const awsRoutes = require('./routes/cloud/AWS');
const azureRoutes = require('./routes/cloud/Azure');
const gcpRoutes = require('./routes/cloud/GCP');

app.use(host_path, index);
app.use(host_path, cloud);
app.use(host_path, awsRoutes);
app.use(host_path, azureRoutes);
app.use(host_path, gcpRoutes);

// const k8 = require("./routes/k8/k8");
const compose = require("./routes/compose");
const running_apps = require("./routes/apps/apps");
const ports = require("./routes/ports");
const external = require('./routes/external');
const scraping = require('./routes/scraping');
const { azure } = require('./SVGs');



// app.use(k8);
app.use(host_path, compose);
app.use(host_path, running_apps);
app.use(host_path, ports);
app.use(host_path, external);
app.use(host_path, scraping);


const AWS = require('./aws/AWSManager');
const aws = new AWS();
aws.checkConnectionToAWS();

const GCP = require('./gcp/GCPManager');
const gcp = new GCP();
gcp.checkConnectionToGCP()


const port = config.APP_PORT || 3000;

app.listen(port, () => {
  console.table({
    'App Name': middlewares.appName,
    'Server Name': middlewares.nodeMiddleware,
    'Start Time': middlewares.nowMiddleware,
    'Server URL': `http://${middlewares.ipMiddleware}:${port}`,
    'Environment': config.ENVIRONMENT,
    'Host path': host_path
  });
});
