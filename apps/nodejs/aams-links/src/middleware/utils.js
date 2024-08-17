var middlewares = {};



const magenta = "\x1b[35m";
const yellow = "\x1b[33m";
const cyan = "\x1b[36m";
const reset = "\x1b[0m";
const green = "\x1b[32m";
const red = "\x1b[31m";



middlewares.addTimestamp = function(req, res, next) {
    const timestamp = Date.now();
    req.timestamp = new Date(timestamp).toLocaleString();
    next();
}

middlewares.logger = function(req, res, next) {
    const url = req.originalUrl;

    if (!url.endsWith('.css') && !url.endsWith('.png') && !url.endsWith('.js')) {
        
        const time = `${magenta}${req.timestamp}${reset}`;
        const method = `${yellow}${req.method}${reset}`;
        const ip_url = `${cyan}${req.ip}${req.originalUrl}${reset}`;

        console.log(`${time}-${method} ${ip_url}`);
        try {
        } catch (error) {
            console.log(error);
        }
    }
    next();
}


middlewares.llog = function(message, cat) {
    const time = `${magenta}${new Date(Date.now()).toLocaleString()}${reset}`;
    switch (cat) {
        case 'error':
            cat = `${yellow}${'ERROR'}${reset}`;
            console.log(`${time}-${cat} ${red}${message}${reset}`);
            break;
        default:
            cat = `${yellow}${'INFO'}${reset}`;
            console.log(`${time}-${cat} ${green}${message}${reset}`);
            break;
    }
}


middlewares.handleError = function (error, req, res, next) {
    console.log(error)
    res.sendStatus(500);
}


middlewares.getMongodbAAMSLinksURI = async function () {
    this.llog(`HCP_API_URL: ${process.env.HCP_API_URL}`);
    try {
      const response = await axios.get(HCP_API_URL, {
        headers: {
          'Authorization': `Bearer ${HCP_API_TOKEN}`
        }
      });
      console.log(response.data.secrets[3].version);
      return response.data.secrets[3].version.value;
    } catch (error) {
      console.error('Error fetching secrets:');
    }
}

module.exports = middlewares;
