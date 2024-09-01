const express = require('express');
const router = express.Router();

const middlewares = require('../../../middlewares/utils');
const SVGs = require('../../../SVGs')
const config = require('../../../config');


const {
    GCPManager,
    BucketManager,
} = require('../../../gcp');



router.get('/aams/cloud/gcp', async (req, res) => {
  try {
    const gcp = new GCPManager();
    const connectionStatus = await gcp.checkConnectionToGCP();
    res.locals.message = 'GCP Main Page Loaded';
    res.render('GCP/gcp', {
      time: new Date(),
      pageTitle: 'GCP',
      connectionStatus: connectionStatus,
      user: req.user,
      host_path: config.HOST_PATH,
    svgs: SVGs,
    });
    
  } catch (error) {
    res.status(500).send('Error checking connection to GCP');
    middlewares.llog(`Not Connected to GCP '${error}'`, 'red', 'gcp');
  }
});

router.get('/aams/cloud/gcp/buckets', async (req, res) => {
  try {
    const gcp_bucket = new BucketManager();
    const buckets = await gcp_bucket.listBuckets();
    const gcp_buckets = []
    for (const bucket in buckets) {
      gcp_buckets.push({ 
        name: buckets[bucket].name, 
        url: buckets[bucket].url,
        size: buckets[bucket].size,
        time: buckets[bucket].time
      });
    }
    res.locals.message = 'GCP Buckets Page Loaded';
    res.render('GCP/buckets', {
      time: new Date(),
      pageTitle: 'GCP Buckets',
      buckets: gcp_buckets,
      user: req.user,
      host_path: config.HOST_PATH,
    svgs: SVGs,
    });
  } catch (error) {
    res.status(500).send('Error accessing GCP buckets');
    middlewares.llog(`Error accessing GCP buckets: ${error}`, 'red', 'gcp');
  }
});

module.exports = router;