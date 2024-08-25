import AWS from "aws-sdk";

const awsConfig = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
};
const awsConfigNoRegion = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
};

export const listStacks = async (desiredRegions) => {
  try {
    const stackPromises = desiredRegions.map(async (region) => {
      const awsConfig_local = {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: region,
      };
      const cloudformation = new AWS.CloudFormation(awsConfig_local);

      const regionStacks = await cloudformation.listStacks().promise();
      return regionStacks.StackSummaries;
    });

    const stackArrays = await Promise.all(stackPromises);
    const allStacks = stackArrays.flat();

    const uniqueStacks = Array.from(
      new Set(allStacks.map((stack) => stack.StackId))
    ).map((stackId) => allStacks.find((stack) => stack.StackId === stackId));

    return uniqueStacks;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const listLambdas = async (desiredRegions) => {
  try {
    const lambdaPromises = desiredRegions.map(async (region) => {
      const awsConfig_local = {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: region,
      };
      const lambda = new AWS.Lambda(awsConfig_local);

      const regionLambdas = await lambda.listFunctions().promise();
      return regionLambdas.Functions.map((lambda) => ({
        ...lambda,
        Region: region,
      }));
    });

    const lambdaArrays = await Promise.all(lambdaPromises);
    const allLambdas = lambdaArrays.flat();

    return allLambdas;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const listEC2Instances = async (desiredRegions) => {
  try {
    const ec2Promises = desiredRegions.map(async (region) => {
      const awsConfig_local = {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
        region: region,
      };
      const ec2 = new AWS.EC2(awsConfig_local);

      const regionInstances = await ec2.describeInstances().promise();
      const instances = regionInstances.Reservations.flatMap((reservation) =>
        reservation.Instances.map((instance) => ({
          ...instance,
          Region: region,
        }))
      );

      return instances;
    });

    const ec2Instances = await Promise.all(ec2Promises);
    return ec2Instances.flat();
  } catch (error) {
    console.error("Error listing EC2 instances:", error);
    throw error;
  }
};

export const listDistributions = async () => {
  try {
    const cloudfront = new AWS.CloudFront(awsConfig);

    const distributions = await cloudfront.listDistributions().promise();
    return distributions.DistributionList.Items;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const listRecords = async () => {
  try {
    const route53 = new AWS.Route53(awsConfig);

    const hostedZones = await route53.listHostedZones().promise();
    const zoneIds = hostedZones.HostedZones.map((zone) => zone.Id);

    const recordPromises = zoneIds.map(async (zoneId) => {
      const params = {
        HostedZoneId: zoneId,
      };

      const records = await route53.listResourceRecordSets(params).promise();
      return records.ResourceRecordSets;
    });

    const recordArrays = await Promise.all(recordPromises);
    const allRecords = recordArrays.flat();

    return allRecords;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const listCertificates = async () => {
  try {
    const acm = new AWS.ACM(awsConfig);

    const certificates = await acm.listCertificates().promise();
    return certificates.CertificateSummaryList;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const listAccounts = async () => {
  try {
    const sts = new AWS.STS(awsConfigNoRegion);
    const callerIdentity = await sts.getCallerIdentity().promise();
    const accountDetails = [
      {
        AccountId: callerIdentity.Account,
        Alias: callerIdentity.Arn.split("/")[1],
        Description: callerIdentity.Arn.split("/")[1],
      },
    ];
    return accountDetails;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const listIamUsers = async () => {
  try {
    const iam = new AWS.IAM(awsConfig);
    const iamUsers = await iam.listUsers().promise();
    return iamUsers.Users;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const listIamGroups = async () => {
  try {
    const iam = new AWS.IAM(awsConfig);
    const iamGroups = await iam.listGroups().promise();
    return iamGroups.Groups;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const listIamRoles = async () => {
  try {
    const iam = new AWS.IAM(awsConfig);
    const iamRoles = await iam.listRoles().promise();
    return iamRoles.Roles;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const listPolicies = async () => {
  try {
    const iam = new AWS.IAM(awsConfig);
    const iamPolicies = await iam.listPolicies().promise();
    return iamPolicies.Policies;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
