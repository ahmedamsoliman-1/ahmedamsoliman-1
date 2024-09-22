const node = require("os").hostname();
const dotenv = require('dotenv');

const ll = require('../middleware/utils');

if (node === 'AVRAST3412') {
    const path = '/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/env/blogapp/.env'
    dotenv.config({ path: path });
    ll.llog(`Loading env from ${path}`)
} else {
    ll.llog(`Loading env from process.env`)
    dotenv.config();
}


const envs = {
    DB_TYPE: process.env.DB_TYPE,
    POSTGRES_DB_URI: process.env.POSTGRES_DB_URI,
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    PORT: process.env.PORT

}

module.exports = envs;