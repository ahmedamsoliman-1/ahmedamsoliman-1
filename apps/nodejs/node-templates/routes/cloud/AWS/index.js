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
  SNS,
  OpenSearch,
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


router.get('/aws/s3', async (req, res) => {
  try {
    const s3 = new S3();
    const s3_bucket_list = await s3.listBucketsAndObjects();
    res.locals.message = 'S3 Page Loaded';
    res.render('aws/s3', {
      time: new Date(),
      pageTitle: 'S3',
      s3_bucket_list: s3_bucket_list,
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
    });
    
  } catch (error) {
    middlewares.llog(`Not Able to List S3 Bucket`, 'red', 'aws');
  }
});

router.get('/aws/opensearch', async (req, res) => {
  try {
    const opensearch = new OpenSearch();
    const domains = await opensearch.listDomains();
    await opensearch.createIndex('test');
    res.locals.message = 'Open Search Page Loaded';
    res.render('aws/opensearch', {
      time: new Date(),
      pageTitle: 'Open Search',
      domains: domains,
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
    });
    
  } catch (error) {
    middlewares.llog(`Not Able to List S3 Bucket`, 'red', 'aws');
  }
});

router.get('/aws/dynamo', async (req, res) => {
  try {
    const dynamo = new DynamoDB();
    const list = await dynamo.listTables();

    res.locals.message = 'DynamoDB Page Loaded';
    res.render('aws/dynamo', {
      time: new Date(),
      pageTitle: 'Dynamo',
      list: list,
    });
  } catch (error) {
    middlewares.llog(`Not Able to List DynamoDB Tables`, 'red', 'aws');
  }
});
router.get('/aws/sns', async (req, res) => {
  try {
    const sns = new SNS();
    const sns_topics_list = await sns.listTopics();
    res.locals.message = 'SNS Page Loaded';
    res.render('aws/sns', {
      time: new Date(),
      pageTitle: 'SNS',
      sns_topics_list: sns_topics_list,
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
    });
  } catch (error) {
    middlewares.llog(`Not Able to List SNS Topics`, 'red', 'aws');
  }
});


router.get('/aws/ecs', async (req, res) => {
  try {
    const ecs = new ECS();
    const ecs_clusters = await ecs.listClustersWithDetails();
    
    res.locals.message = 'ECS Page Loaded';
    res.render('aws/ecs', {
      time: new Date(),
      pageTitle: 'ECS',
      ecs_clusters: ecs_clusters,
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
    });
  } catch (error) {
    middlewares.llog(`Not Able to LIST ECS Clusters`, 'red', 'aws');
  }
});

router.get('/aws/ecr', async (req, res) => {
  try {
    const ecrManager = new ECR();
    const repositories = await ecrManager.listRepositories();

    const repositoriesWithImages = await Promise.all(repositories.map(async (repository) => {
      const images = await ecrManager.listImages(repository.repositoryName);
      return { repository, images };
    }));

    res.locals.message = 'ECR Page Loaded';
    res.render('aws/ecr', {
      time: new Date(),
      pageTitle: 'ECR',
      repositories: repositoriesWithImages,
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
    });
  } catch (error) {
    middlewares.llog(`Not Able to LIST ECR Repositories`, 'red', 'aws');
    res.status(500).send('Internal Server Error');
  }
});

router.get('/aws/cloudwatch', async (req, res) => {
  try {
    const cloudWatch = new CloudWatch();
    const cloud_watch = await cloudWatch.listLogsAndEvents();
    
    res.locals.message = 'CloudWatch Logs Page Loaded';
    res.render('aws/cloudwatch', {
      time: new Date(),
      pageTitle: 'CloudWatch Logs',
      cloud_watch: cloud_watch,
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
    });
  } catch (error) {
    middlewares.llog(`Error accessing AWS CloudWatch Logs: ${error}`, 'red', 'aws');
    res.status(500).send('Error accessing AWS CloudWatch Logs');
  }
});


// router.get('/aws/cloudformation', async (req, res) => {
//   try {
//     const cloudFormation = new CF();
//     const stacks = await cloudFormation.listStacksDetails();    
//     res.locals.message = 'CloudFormation Stacks Page Loaded';
//     res.render('aws/cloudformation', {
//       time: new Date(),
//       pageTitle: 'AWS CloudFormation Templates',
//       stacks: stacks.map(stack => ({
//         name: stack.StackName,
//         status: stack.StackStatus,
//         outputs: stack.Outputs,
//         stackUrl: `https://${config.AWS.AWS_REGION}.console.aws.amazon.com/cloudformation/home?region=${config.AWS.AWS_REGION}#/stacks/${stack.StackId}`
//       })),
//       profile: config.AWS.AWS_PROFILE,
//       region: config.AWS.AWS_REGION,
//     });
//   } catch (error) {
//     middlewares.llog(`Error accessing AWS CloudFormation Stacks: ${error}`, 'red', 'aws');
//     res.status(500).send('Error accessing AWS CloudFormation Stacks');
//   }
// });

router.get('/aws/cloudformation', async (req, res) => {
  try {
    const cloudFormation = new CF();
    const stacks = await cloudFormation.listStacksDetails();

    // Check if the stacks array is empty
    if (stacks.length === 0) {
      // Render an alternative view or return an appropriate message
      return res.render('error', {
        user: req.user,
        time: new Date(),
        pageTitle: 'Error',
        error: aliasData.m_error,
        derror: aliasData.d_error,
      });
    }

    res.locals.message = 'CloudFormation Stacks Page Loaded';
    res.render('aws/cloudformation', {
      time: new Date(),
      pageTitle: 'AWS CloudFormation Templates',
      stacks: stacks.map(stack => ({
        name: stack.StackName,
        status: stack.StackStatus,
        outputs: stack.Outputs,
        stackUrl: `https://${config.AWS.AWS_REGION}.console.aws.amazon.com/cloudformation/home?region=${config.AWS.AWS_REGION}#/stacks/${stack.StackId}`
      })),
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
    });
  } catch (error) {
    middlewares.llog(`Error accessing AWS CloudFormation Stacks: ${error}`, 'red', 'aws');
    res.status(500).send('Error accessing AWS CloudFormation Stacks');
  }
});



router.get('/aws/ec2', async (req, res) => {
  try {
    const ec2Manager = new EC2();
    const instances = await ec2Manager.listInstances();
    
    res.locals.message = 'EC2 Instances Page Loaded';
    res.render('aws/ec2', {
      time: new Date(),
      pageTitle: 'EC2 Instances',
      instances: instances,
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
    });
  } catch (error) {
    middlewares.llog(`Error accessing AWS EC2 instances: ${error}`, 'red', 'aws');
    res.status(500).send('Error accessing AWS EC2 instances');
  }
});


router.get('/aws/iam', async (req, res) => {
  try {
    const iamManager = new IAM();
    const users = await iamManager.listUsers();
    res.locals.message = 'IAM Users Page Loaded';
    res.render('aws/iam', {
      time: new Date(),
      pageTitle: 'IAM Users',
      users: users,
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
    });
  } catch (error) {
    middlewares.llog(`Error accessing AWS IAM users: ${error}`, 'red', 'aws');
    res.status(500).send('Error accessing AWS IAM users');
  }
});

router.get('/aws/sqs', async (req, res) => {
  try {
    res.locals.message = 'SQS Page Loaded';
    res.render('aws/sqs', {
      time: new Date(),
      pageTitle: 'SQS',
      sqs: 'sqs',
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
    });
  } catch (error) {
    middlewares.llog(`Error accessing AWS IAM users: ${error}`, 'red', 'aws');
    res.status(500).send('Error accessing AWS IAM users');
  }
});

router.get('/aws/eks', async (req, res) => {
  try {
    res.locals.message = 'EKS Page Loaded';
    res.render('aws/eks', {
      time: new Date(),
      pageTitle: 'EKS',
      eks: 'eks',
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
      cred: middlewares.cred,
    });
  } catch (error) {
    middlewares.llog(`Error accessing AWS IAM users: ${error}`, 'red', 'aws');
    res.status(500).send('Error accessing AWS IAM users');
  }
});

router.get('/aws/lambda', async (req, res) => {
  try {
    const lambda = new Lambda();
    const lambdas = await lambda.listFunctions();
    res.locals.message = 'Lambda Page Loaded';
    res.render('aws/lambda', {
      time: new Date(),
      pageTitle: 'Lambda',
      lambdas: lambdas,
      profile: config.AWS.AWS_PROFILE,
      region: config.AWS.AWS_REGION,
      cred: middlewares.cred,
      user_role: 'user_role'
    });
  } catch (error) {
    middlewares.llog(`Error accessing AWS IAM users: ${error}`, 'red', 'aws');
    res.status(500).send('Error accessing AWS IAM users');
  }
});

module.exports = router;
