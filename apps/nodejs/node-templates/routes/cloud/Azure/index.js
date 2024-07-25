const express = require('express');
const router = express.Router();

const authController = require('../../../controllers/authController');
const middlewares = require('../../../middlewares/utils');
const SVGs = require('../../../SVGs')
const config = require('../../../config');


const {
  EC2,
  AWSManager,
  CloudFormation,
  CloudWatch,
  SystemsManager,
  S3,
  Lambda,
  ECS,
  ECR,
  SNS
} = require('../../../aws');



router.get('/aws',  async (req, res) => {
  try {
    const aws = new AWSManager();
    const connectionStatus = await aws.checkConnectionToAWS();
    res.locals.message = 'AWS Main Page Loaded';
    res.render('aws/aws', {
      time: new Date(),
      pageTitle: 'AWS',
      connectionStatus: connectionStatus,
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
      user: req.user,
      svgs: SVGs,
    });
    
  } catch (error) {
    res.status(500).send('Error checking connection to AWS');
    middlewares.llog(`Not Connected to AWS '${error}'`, 'red', 'aws');
  }
});

module.exports = router;