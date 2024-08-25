export function LinkToHostedZone() {
  return (
    <p>
      Hosted zone:{" "}
      <a
        href="https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones#ListRecordSets/Z07706771WL0WO5D92PH2"
        target="_blank"
        rel="noreferrer"
      >
        ahmedalimsoliman.click
      </a>
    </p>
  );
}

export function LinkToDistribution() {
  return (
    <p>
      CloudFront Distribution:{" "}
      <a
        href="https://us-east-1.console.aws.amazon.com/cloudfront/v3/home?region=us-east-1#/distributions"
        target="_blank"
        rel="noreferrer"
      >
        Distribution
      </a>
    </p>
  );
}

export function LinkToCertificats() {
  return (
    <p>
      SSL Certificats:{" "}
      <a
        href="https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/list"
        target="_blank"
        rel="noreferrer"
      >
        Certificats
      </a>
    </p>
  );
}

export function LinkToS3() {
  return (
    <p>
      S3 Buckets:{" "}
      <a
        href="https://s3.console.aws.amazon.com/s3/buckets?region=me-central-1"
        target="_blank"
        rel="noreferrer"
      >
        Buckets
      </a>
    </p>
  );
}

const ec2_me_central_1 =
  "https://me-central-1.console.aws.amazon.com/ec2/home?region=me-central-1#Instances:v=3;$case=tags:true%5C,client:false;$regex=tags:false%5C,client:false";
const ec2_us_east_1 =
  "https://us-east-1.console.aws.amazon.com/ec2/home?region=us-east-1#Instances:v=3;$case=tags:true%5C,client:false;$regex=tags:false%5C,client:false";

export function LinkToEC2UAE() {
  return (
    <p>
      me-central-1:{" "}
      <a href={ec2_me_central_1} target="_blank" rel="noreferrer">
        Go
      </a>
    </p>
  );
}

export function LinkToEC2USA() {
  return (
    <p>
      us-east-1:{" "}
      <a href={ec2_us_east_1} target="_blank" rel="noreferrer">
        Go
      </a>
    </p>
  );
}

const me_central_1 =
  "https://console.aws.amazon.com/cloudformation/home?region=me-central-1#/stacks";
const us_east_1 =
  "https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks";
const us_east_2 =
  "https://console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks";

export function LinkToCloudformation_me_central_1() {
  return (
    <p>
      me-central-1:{" "}
      <a href={me_central_1} target="_blank" rel="noreferrer">
        Go
      </a>
    </p>
  );
}

export function LinkToCloudformation_us_east_1() {
  return (
    <p>
      us-east-1:{" "}
      <a href={us_east_1} target="_blank" rel="noreferrer">
        Go
      </a>
    </p>
  );
}

export function LinkToCloudformation_us_east_2() {
  return (
    <p>
      us-east-2:{" "}
      <a href={us_east_2} target="_blank" rel="noreferrer">
        Go
      </a>
    </p>
  );
}

const lambda_me_central_1 =
  "https://me-central-1.console.aws.amazon.com/lambda/home?region=me-central-1#/functions";
const lambda_us_east_1 =
  "https://us-east-1.console.aws.amazon.com/lambda/home?region=us-east-1#/functions";
const lambda_us_east_2 =
  "https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/functions";

export function LinkToLambda_me_central_1() {
  return (
    <p>
      me-central-1:{" "}
      <a href={lambda_me_central_1} target="_blank" rel="noreferrer">
        Go
      </a>
    </p>
  );
}

export function LinkToLambda_us_east_1() {
  return (
    <p>
      us-east-1:{" "}
      <a href={lambda_us_east_1} target="_blank" rel="noreferrer">
        Go
      </a>
    </p>
  );
}

export function LinkToLambda_us_east_2() {
  return (
    <p>
      us-east-2:{" "}
      <a href={lambda_us_east_2} target="_blank" rel="noreferrer">
        Go
      </a>
    </p>
  );
}
