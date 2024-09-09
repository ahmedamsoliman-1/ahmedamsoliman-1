import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import {
  LinkToS3,
  LinkToCertificats,
  LinkToDistribution,
  LinkToHostedZone,
  LinkToCloudformation_me_central_1,
  LinkToCloudformation_us_east_1,
  LinkToCloudformation_us_east_2,
  LinkToLambda_me_central_1,
  LinkToLambda_us_east_1,
  LinkToLambda_us_east_2,
  LinkToEC2UAE,
  LinkToEC2USA,
} from "./Links";
import {
  listStacks,
  listLambdas,
  listRecords,
  listEC2Instances,
  listDistributions,
  listCertificates,
  listIamUsers,
  listIamGroups,
  listIamRoles,
  listPolicies,
  listAccounts,
} from "./Lists";
import {
  StackTable,
  LambdaTable,
  InstancesTable,
  CloudFrontTable,
  Route53Table,
  CertificateTable,
  UsersTable,
  GroupsTable,
  PoliciesTable,
  AccountsTable,
} from "./Tables";
import Navbar from "./Navbar";
import { CloudFormationFilterControls, LambdaFilterControls } from "./Controls";
import { Summarization } from "./Summary";

function App() {
  const desiredRegions = [
    "us-east-1",
    "us-east-2",
    "me-central-1",
    "us-west-1",
  ];

  const [stacks, setStacks] = useState([]);
  const [ec2s, setEc2s] = useState([]);
  const [loading, setLoading] = useState(true);
  const [link] = useState([]);
  const [dist] = useState([]);
  const [certificate] = useState([]);
  const [bucket] = useState([]);
  const [ec2] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterStackName, setFilterStackName] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [distributions, setDistributions] = useState([]);
  const [records, setRecords] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [lambdas, setLambdas] = useState([]);
  const [buckets, setBuckets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const listResources = async () => {
    try {
      const stackData = await listStacks(desiredRegions);
      setStacks(stackData);

      const ec2Data = await listEC2Instances(desiredRegions);
      setEc2s(ec2Data);

      const lambdaData = await listLambdas(desiredRegions);
      setLambdas(lambdaData);

      const distributionData = await listDistributions();
      setDistributions(distributionData);

      const recordData = await listRecords();
      setRecords(recordData);

      const fetchedCertificates = await listCertificates();
      setCertificates(fetchedCertificates);

      const fetchedIamUsers = await listIamUsers();
      setUsers(fetchedIamUsers);

      const fetchedIamGrups = await listIamGroups();
      setGroups(fetchedIamGrups);

      const fetchedIamRoles = await listIamRoles();
      setRoles(fetchedIamRoles);

      const fetchedIamPolicies = await listPolicies();
      setPolicies(fetchedIamPolicies);

      const accountsData = await listAccounts();
      setAccounts(accountsData);

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function LoadingMessage({ loading }) {
    return loading ? <p>Loading ...</p> : null;
  }

  function StackSummary({ stacks }) {
    const stacks_all = {};

    stacks.forEach((stack) => {
      const region = stack.StackId.split(":")[3];
      if (stacks_all[region]) {
        stacks_all[region]++;
      } else {
        stacks_all[region] = 1;
      }

      const status = stack.StackStatus;
      if (stacks_all[status]) {
        stacks_all[status]++;
      } else {
        stacks_all[status] = 1;
      }
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            {Object.entries(stacks_all).map(([region, count]) => (
              <th>{region}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>#</th>
            {Object.entries(stacks_all).map(([region, count]) => (
              <td>{count}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  function LambdaSummary({ lambdas }) {
    const lambdas_all = {};

    lambdas.forEach((lambda) => {
      const region = lambda.Region;
      if (lambdas_all[region]) {
        lambdas_all[region]++;
      } else {
        lambdas_all[region] = 1;
      }

      const runtime = lambda.Runtime;
      if (lambdas_all[runtime]) {
        lambdas_all[runtime]++;
      } else {
        lambdas_all[runtime] = 1;
      }
    });

    return (
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            {Object.entries(lambdas_all).map(([region, count]) => (
              <th>{region}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>#</th>
            {Object.entries(lambdas_all).map(([region, count]) => (
              <td>{count}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    listResources();
  }, []);

  const handleStatusFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleStackNameFilterChange = (event) => {
    setFilterStackName(event.target.value);
  };

  const handleRegionFilterChange = (event) => {
    setFilterRegion(event.target.value);
  };

  function BucketItem({ bucket }) {
    const { Name, Region, CreationDate, BucketLink, S3StaticEndpoint } = bucket;

    return (
      <tr>
        <td>{Name}</td>
        <td>{Region}</td>
        <td>{CreationDate}</td>
        <td>
          <a href={BucketLink} target="_blank" rel="noopener noreferrer">
            Open Bucket
          </a>
        </td>
        <td>
          <a href={S3StaticEndpoint} target="_blank" rel="noopener noreferrer">
            Open Static Endpoint
          </a>
        </td>
      </tr>
    );
  }

  function BucketList() {
    useEffect(() => {
      fetchBuckets();
    }, []);

    const fetchBuckets = async () => {
      try {
        const response = await fetch("http://localhost:3001/aams/s3/2/buckets");
        // const response = await fetch(
        //   "http://ec2-54-167-242-221.compute-1.amazonaws.com:3001/buckets"
        // );

        const data = await response.json();
        setBuckets(data);
      } catch (error) {
        console.log("Error fetching buckets:", error);
      }
    };

    return (
      <div>
        <h2>Bucket Count: {buckets.length}</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Region</th>
              <th>Creation Date</th>
              <th>Bucket Link</th>
              <th>S3 Static Endpoint</th>
            </tr>
          </thead>
          <tbody>
            {buckets.map((bucket) => (
              <BucketItem key={bucket.Name} bucket={bucket} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <br></br>
        <br></br>
        <h1>AWS Account</h1>
        <AccountsTable accounts={accounts} />
        <h1>AWS Resources Overview</h1>
        <Summarization
          certificates={certificates}
          distributions={distributions}
          records={records}
          lambdas={lambdas}
          stacks={stacks}
          buckets={buckets}
          users={users}
          groups={groups}
          roles={roles}
          policies={policies}
          ec2s={ec2s}
          accounts={accounts}
        />
        <br></br>
        <h1>Summarized AWS Resources</h1>
        <h2>AWS Cloudformation Stacks</h2>
        <StackSummary stacks={stacks} />
        <h2>AWS Lambdas</h2>
        <LambdaSummary lambdas={lambdas} />
        <br></br>
        <h1>All AWS Currently Available</h1>
        <h1>AWS EC2 Instances</h1>
        <h2>Links</h2>
        <LinkToEC2UAE ec2={ec2} />
        <LinkToEC2USA ec2={ec2} />
        <InstancesTable ec2s={ec2s} />
        <h1>AWS S3 Buckets</h1>
        <LinkToS3 bucket={bucket} />
        <BucketList />
        <h1>AWS SSL Certificates</h1>
        <LinkToCertificats certificate={certificate} />
        <LoadingMessage loading={loading} />
        <CertificateTable certificates={certificates} />
        <h1>AWS Route53 Records</h1>
        <LoadingMessage loading={loading} />
        <LinkToHostedZone link={link} />
        <Route53Table records={records} />
        <h1>AWS CloudFront Distributions</h1>
        <LoadingMessage loading={loading} />
        <LinkToDistribution dist={dist} />
        <CloudFrontTable distributions={distributions} />
        <h1>AWS Lambda Functions</h1>
        <h2>Links</h2>
        <LinkToLambda_me_central_1 />
        <LinkToLambda_us_east_1 />
        <LinkToLambda_us_east_2 />
        <h2>Lambda Summary</h2>
        <LambdaSummary lambdas={lambdas} /> {/* Add LambdaSummary component */}
        <h2>All Functions</h2>
        <LoadingMessage loading={loading} />
        <LambdaTable lambdas={lambdas} />
        <br></br>
        <br></br>
        <h1>AWS CloudFormation Stacks</h1>
        <h2>Filterer</h2>
        <CloudFormationFilterControls
          filterStatus={filterStatus}
          filterStackName={filterStackName}
          filterRegion={filterRegion}
          onStatusFilterChange={handleStatusFilterChange}
          onStackNameFilterChange={handleStackNameFilterChange}
          onRegionFilterChange={handleRegionFilterChange}
        />
        <h2>Links</h2>
        <LinkToCloudformation_me_central_1 />
        <LinkToCloudformation_us_east_1 />
        <LinkToCloudformation_us_east_2 />
        <h2>Stacks Summary</h2>
        <StackSummary stacks={stacks} />
        <h2>All Stacks</h2>
        <LoadingMessage loading={loading} />
        <StackTable
          stacks={stacks}
          filterStatus={filterStatus}
          filterStackName={filterStackName}
          filterRegion={filterRegion}
        />
        <h1>AWS IAM</h1>
        <h2>IAM Users</h2>
        <UsersTable users={users} />
        <h2>IAM Groups</h2>
        <GroupsTable groups={groups} />
        <h2>IAM Policies</h2>
        <PoliciesTable policies={policies} />
      </div>
    </BrowserRouter>
  );
}

export default App;
