const EC2 = require('./EC2');
const AWSManager = require('./AWSManager');
const CloudFormation = require('./CloudFormation');
const CloudWatch = require('./CloudWatch');
const SystemsManager = require('./SystemsManager');
const S3 = require('./S3');
const Lambda = require('./Lambda');
const ECS = require('./ECS');
const ECR = require('./ECR');
const SNS = require('./SNS');
const OpenSearch = require('./DBs/OpenSearch');

module.exports = {
    EC2,
    AWSManager,
    CloudFormation,
    CloudWatch,
    SystemsManager,
    S3,
    Lambda,
    ECS,
    ECR,
    OpenSearch
}