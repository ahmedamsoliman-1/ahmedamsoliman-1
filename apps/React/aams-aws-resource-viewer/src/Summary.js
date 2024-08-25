export function Summarization({
  certificates,
  distributions,
  records,
  lambdas,
  stacks,
  buckets,
  users,
  groups,
  roles,
  policies,
  ec2s,
  accounts,
}) {
  const totalCertificates = certificates.length;
  const totalDistributions = distributions.length;
  const totalRecords = records.length;
  const totalLambdas = lambdas.length;
  const totalStacks = stacks.length;
  const totalBuckets = buckets.length;
  const totalUsers = users.length;
  const totalGroups = groups.length;
  const totalRoles = roles.length;
  const totalPolicies = policies.length;
  const totalEC2s = ec2s.length;
  const taccounts = accounts.length;

  return (
    <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Certificates</th>
          <th>Distributions</th>
          <th>Records</th>
          <th>Lambdas</th>
          <th>Stacks</th>
          <th>Buckets</th>
          <th>Users</th>
          <th>Groups</th>
          <th>Roles</th>
          <th>Policies</th>
          <th>EC2s</th>
          <th>Accounts</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>#</th>
          <th>{totalCertificates}</th>
          <th>{totalDistributions}</th>
          <th>{totalRecords}</th>
          <th>{totalLambdas}</th>
          <th>{totalStacks}</th>
          <th>{totalBuckets}</th>
          <th>{totalUsers}</th>
          <th>{totalGroups}</th>
          <th>{totalRoles}</th>
          <th>{totalPolicies}</th>
          <th>{totalEC2s}</th>
          <th>{taccounts}</th>
        </tr>
      </tbody>
    </table>
  );
}
