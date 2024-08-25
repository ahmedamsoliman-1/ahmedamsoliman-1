export function LambdaFilterControls({
  filterFunctionName,
  onFunctionNameFilterChange,
}) {
  return (
    <div className="filter-controls">
      <label htmlFor="filterFunctionName">Filter by Function Name:</label>
      <input
        type="text"
        id="filterFunctionName"
        value={filterFunctionName}
        onChange={onFunctionNameFilterChange}
      />
    </div>
  );
}

export function CloudFormationFilterControls({
  filterStatus,
  filterStackName,
  filterRegion,
  filterFunctionName,
  onStatusFilterChange,
  onStackNameFilterChange,
  onRegionFilterChange,
  onFunctionNameFilterChange,
}) {
  return (
    <div className="filter-controls">
      <label htmlFor="filterStatus">Filter by Status:</label>
      <select
        id="filterStatus"
        value={filterStatus}
        onChange={onStatusFilterChange}
      >
        <option value="">All</option>
        <option value="CREATE_IN_PROGRESS">Create In Progress</option>
        <option value="CREATE_COMPLETE">Create Complete</option>
        <option value="ROLLBACK_IN_PROGRESS">Rollback In Progress</option>
        <option value="ROLLBACK_COMPLETE">Rollback Complete</option>
        <option value="DELETE_COMPLETE">Delete Complete</option>
      </select>

      <label htmlFor="filterStackName">Filter by Stack Name:</label>
      <input
        type="text"
        id="filterStackName"
        value={filterStackName}
        onChange={onStackNameFilterChange}
      />

      <label htmlFor="filterRegion">Filter by Region:</label>
      <select
        id="filterRegion"
        value={filterRegion}
        onChange={onRegionFilterChange}
      >
        <option value="">All</option>
        <option value="us-east-1">N. Virginia (us-east-1)</option>
        <option value="us-east-2">Ohio (us-east-2)</option>
        <option value="me-central-1">UAE (me-central-1)</option>
      </select>

      {filterFunctionName !== undefined && (
        <LambdaFilterControls
          filterFunctionName={filterFunctionName}
          onFunctionNameFilterChange={onFunctionNameFilterChange}
        />
      )}
    </div>
  );
}
