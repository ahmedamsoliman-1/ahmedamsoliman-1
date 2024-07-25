const { Client } = require("cassandra-driver");
async function run() {
  const client = new Client({
    cloud: {
    secureConnectBundle: "secure-connect-aams.zip",
    },
    credentials: {
    username: "&lt;&lt;CLIENT ID&gt;&gt;",
    password: "&lt;&lt;CLIENT SECRET&gt;&gt;",
    },
  });

  await client.connect();

  // Execute a query
  const rs = await client.execute("SELECT * FROM system.local");
  console.log(`Your cluster returned ${rs.rowLength} row(s)`);

  await client.shutdown();
}

// Run the async function
run();