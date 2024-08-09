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
app.use('/auth', authRoutes);

const swagger = require('./swagger');
app.use(swagger);









const git = require('./routes/git/git');
const github = require('./routes/git/github');
const gitlab = require('./routes/git/gitlab');
app.use(git);
app.use(github);
app.use(gitlab);




const gallery = require('./routes/gallery/gallery');
const videos = require('./routes/gallery/videos');
const document = require('./routes/document/document');
app.use(gallery);
app.use(videos);
app.use(document);









const dbs = require('./routes/db/dbs');
const cassandra = require('./routes/db/cassandra');
const cassandraInitializer = require('./db/cassandra/cassandraInitializer');
const es = require("./routes/db/es");
const mongo = require('./routes/db/mongo');
const PostgreSQL = require('./routes/db/PostgreSQL');
app.use(dbs);
app.use(cassandra);
app.use(es);
app.use(mongo);
app.use(PostgreSQL);









const queues = require('./routes/queues/queues');
const rabbit = require('./routes/queues/rabbit');
const activemq = require('./routes/queues/activemq');
// const kafka = require('./routes/queues/kafka');
app.use(queues);
app.use(rabbit);
app.use(activemq);
// app.use(kafka);





const cache = require('./routes/cache/cache');
const redis = require("./routes/cache/redis");
const memcached = require("./routes/cache/memcached");
app.use(cache);
app.use(redis);
app.use(memcached);





const index = require("./routes/index");
app.use(index);

const cloud = require('./routes/cloud/cloud');
const awsRoutes = require('./routes/cloud/AWS');
const azureRoutes = require('./routes/cloud/Azure');
const gcpRoutes = require('./routes/cloud/GCP');
app.use(cloud);
app.use(awsRoutes);
app.use(azureRoutes);
app.use(gcpRoutes);

// const k8 = require("./routes/k8/k8");
const compose = require("./routes/compose");
const ports = require("./routes/ports");
const external = require('./routes/external');
const scraping = require('./routes/scraping');
const { azure } = require('./SVGs');



// app.use(k8);
app.use(compose);
app.use(ports);
app.use(external);
app.use(scraping);


const AWS = require('./aws/AWSManager');
const aws = new AWS();
aws.checkConnectionToAWS();

const GCP = require('./gcp/GCPManager');
const gcp = new GCP();
gcp.checkConnectionToGCP()

// app.use((req, res) => {
//   res.render('error', {
//     user: req.user,
//     time: new Date(),
//     pageTitle: 'Error',
//     error: 'Something went wrong',
//     derror: 'Something went wrong',
//   });
  
// });


const port = config.APP_PORT || 3000;

app.listen(port, () => {
  console.table({
    'App Name': middlewares.appName,
    'Server Name': middlewares.nodeMiddleware,
    'Start Time': middlewares.nowMiddleware,
    'Server URL': `http://${middlewares.ipMiddleware}:${port}`,
  });
});
