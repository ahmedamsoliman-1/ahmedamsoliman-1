var client = require("../../db/PostgreSQL")

var middlewares = {};

middlewares.listPostgreSQLDatabases = async function() {
    const databasesList = await client.query('SELECT datname FROM pg_database WHERE datistemplate = false;');
    return databasesList;
};

middlewares.listPostgreSQLTables = async function(db_name) {
    const tablesList = await client.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = '${db_name}';`);
    console.log('tablesList')
    console.log(tablesList)
    console.log('tablesList')
    return tablesList;
};


module.exports = middlewares;

