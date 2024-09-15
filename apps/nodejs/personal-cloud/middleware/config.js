const node = require("os").hostname();
const dotenv = require('dotenv');

const ll = require('../middleware/utils');

if (node === 'AVRAST3412') {
    const path = '../../../env/.env'
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
}

module.exports = envs;