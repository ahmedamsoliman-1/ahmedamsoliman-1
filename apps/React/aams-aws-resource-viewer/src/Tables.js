import React from "react";

export function StackTable({
  stacks,
  filterStatus,
  filterStackName,
  filterRegion,
}) {
  const filteredStacks = stacks.filter((stack) => {
    const isStatusMatch = filterStatus
      ? stack.StackStatus === filterStatus
      : true;
    const isStackNameMatch = filterStackName
      ? stack.StackName.includes(filterStackName)
      : true;
    const isRegionMatch = filterRegion
      ? stack.StackId.split(":")[3] === filterRegion
      : true;
    return isStatusMatch && isStackNameMatch && isRegionMatch;
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Stack Name</th>
          <th>Region</th>
          <th>Create Date</th>
          <th>Status</th>
          <th>Stack URL</th>
        </tr>
      </thead>
      <tbody>
        {filteredStacks.map((stack, index) => (
          <tr key={stack.StackId}>
            <td>{index + 1}</td>
            <td>{stack.StackName}</td>
            <td>{stack.StackId.split(":")[3]}</td>
            <td>{stack.CreationTime.toISOString()}</td>
            <td>{stack.StackStatus}</td>
            <td>
              <a
                href={`https://console.aws.amazon.com/cloudformation/home?region=${
                  stack.StackId.split(":")[3]
                }#/stacks/stackinfo?stackId=${stack.StackId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Stack
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LambdaTable({ lambdas }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Function Name</th>
          <th>Description</th>
          <th>Region</th>
          <th>Runtime</th>
          <th>Memory (MB)</th>
          <th>Timeout (s)</th>
          <th>Function URL</th>
        </tr>
      </thead>
      <tbody>
        {lambdas.map((lambda, index) => (
          <tr key={lambda.FunctionName}>
            <td>{index + 1}</td>
            <td>{lambda.FunctionName}</td>
            <td>{lambda.Description}</td>
            <td>{lambda.Region}</td>
            <td>{lambda.Runtime}</td>
            <td>{lambda.MemorySize}</td>
            <td>{lambda.Timeout}</td>
            <td>
              <a
                href={`https://console.aws.amazon.com/lambda/home?region=${lambda.Region}#/functions/${lambda.FunctionName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Function
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function InstancesTable({ ec2s }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Instance ID</th>
          <th>Instance Name</th>
          <th>Instance Type</th>
          <th>State</th>
          <th>Region</th>
          <th>Public IP</th>
          <th>Public DNS</th>
          <th>Private IP</th>
          <th>Key Pair</th>
          <th>Security Group</th>
          <th>View Security Group</th>
          <th>View Instance</th>
        </tr>
      </thead>
      <tbody>
        {ec2s.map((ec2, index) => (
          <tr key={ec2.InstanceId}>
            <td>{index + 1}</td>
            <td>{ec2.InstanceId}</td>
            <td>{ec2.Tags.find((tag) => tag.Key === "Name")?.Value || "-"}</td>

            <td>{ec2.InstanceType}</td>
            <td>{ec2.State.Name}</td>
            <td>{ec2.Region}</td>
            <td>{ec2.PublicIpAddress}</td>
            <td>{ec2.PublicDnsName}</td>
            <td>{ec2.PrivateIpAddress}</td>
            <td>{ec2.KeyName}</td>
            <td>
              {ec2.SecurityGroups.length > 0 ? (
                <a
                  href={`https://console.aws.amazon.com/ec2/v2/home?region=${ec2.Region}#SecurityGroups:groupId=${ec2.SecurityGroups[0].GroupId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ec2.SecurityGroups[0].GroupName}
                </a>
              ) : (
                "-"
              )}
            </td>
            <td>
              <a
                href={`https://console.aws.amazon.com/ec2/v2/home?region=${ec2.Region}#Instances:instanceId=${ec2.InstanceId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Instance
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function CloudFrontTable({ distributions }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Id</th>
          <th>Domain</th>
          <th>Alternate Domain Names</th>
          <th>Description</th>
          <th>Origins</th>
          <th>Last Modified</th>
          <th>Status</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {distributions.map((distribution, index) => (
          <tr key={distribution.Id}>
            <td>{index + 1}</td>
            <td>{distribution.Id}</td>
            <td>
              <a
                href={`https://${distribution.DomainName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {distribution.DomainName}
              </a>
            </td>
            <td>
              {distribution.Aliases.Items.map((alias, aliasIndex) => (
                <React.Fragment key={alias}>
                  {aliasIndex > 0 && ", "}
                  <a
                    href={`https://${alias}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {alias}
                  </a>
                </React.Fragment>
              ))}
            </td>
            <td>{distribution.Comment}</td>
            <td>
              {distribution.Origins.Items.map((origin) => (
                <span key={origin.Id}>
                  {origin.DomainName}
                  <br />
                </span>
              ))}
            </td>
            <td>{new Date(distribution.LastModifiedTime).toLocaleString()}</td>
            <td>{distribution.Status}</td>
            <td>
              <a
                href={`https://console.aws.amazon.com/cloudfront/home?region=${
                  distribution.Id.split("/")[0]
                }#/distributions/${distribution.Id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Route53Table({ records }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Type</th>
          <th>Value</th>
          <th>TTL</th>
          <th>Routing Policy</th>
          <th>Alias Status</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{record.Name}</td>
            <td>{record.Type}</td>
            <td>{record.ResourceRecords.map((rr) => rr.Value).join(", ")}</td>
            <td>{record.TTL}</td>
            <td>{record.RoutingPolicy}</td>
            <td>{record.AliasStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function CertificateTable({ certificates }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Domain Name</th>
          <th>ARN</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {certificates.map((certificate, index) => (
          <tr key={certificate.CertificateArn}>
            <td>{index + 1}</td>
            <td>{certificate.DomainName}</td>
            <td>{certificate.CertificateArn}</td>
            <td>{certificate.Status}</td>
            <td>
              <a
                href={`https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/${certificate.CertificateArn}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function UsersTable({ users }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Account Number</th>
          <th>Alias</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{user.UserName}</td>
            <td>{user.Arn.split(":")[4]}</td>
            <td>{user.Arn.split(":")[5]}</td>
            <td>{user.Description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function AccountsTable({ accounts }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Account Number</th>
          <th>Alias</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((account, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{account.AccountId}</td>
            <td>{account.Alias}</td>
            <td>{account.Description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function GroupsTable({ groups }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Group Name</th>
          <th>Account Number</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{group.GroupName}</td>
            <td>{group.Arn.split(":")[4]}</td>
            <td>{group.Description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function PoliciesTable({ policies }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Policy Name</th>
          <th>Manged By</th>
          <th>Actions</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {policies.map((policy, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{policy.PolicyName}</td>
            <td>{policy.Arn.split(":")[4]}</td>
            <td>{policy.PolicyDocument}</td>
            <td>{policy.Description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
