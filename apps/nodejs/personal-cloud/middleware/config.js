const node = require("os").hostname();
const dotenv = require('dotenv');

const ll = require('../middleware/utils');

if (node === 'AVRAST3412') {
    const path = '../../../env/aamscloud.env'
    dotenv.config({ path: path });
    ll.llog(`Loading env from ${path}`)
} else {
    ll.llog(`Loading env from process.env`)
    dotenv.config();
}


const envs = {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    VERCEL_TOKEN: process.env.VERCEL_TOKEN,
    RENDER_TOKEN: process.env.RENDER_TOKEN,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    HEALTH_CHECK_TIMEOUT: process.env.HEALTH_CHECK_TIMEOUT || 5000,
    BASE: 'https://github.com/ahmedamsoliman-1/ahmedamsoliman-1/tree/main/',
}

module.exports = envs;