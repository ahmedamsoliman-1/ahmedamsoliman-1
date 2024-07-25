const { STSClient, GetCallerIdentityCommand } = require('@aws-sdk/client-sts');
const { fromIni } = require('@aws-sdk/credential-provider-ini');
const { fromContainerMetadata } = require('@aws-sdk/credential-providers');

const userServices = require('../services/userService');
const config = require('../config');


const env = config.ENVIRONMENT;
const region = config.AWS.AWS_REGION;
const profile = config.AWS.AWS_PROFILE;

const middlewares = require('../middlewares/utils');

class AWSManager {
  constructor() {
    this.region = region;
    if (env === 'development') {
      this.credentials = fromIni({ profile });
      // llog(`Using Enviornment ${env}, Credentials 'fromIni'`, 'magenta', 'aws');
    } else {
      this.credentials = fromContainerMetadata({});
      // llog(`Using Enviornment ${env}, credentials 'fromContainerMetadata'`, 'magenta', 'aws');
    }
  }

  async checkConnectionToAWS() {
    try {
      const sts = new STSClient({});
      const response = await sts.send(new GetCallerIdentityCommand({}));
      if (response.$metadata.httpStatusCode === 200) {
        const account = response.Arn.split(':')[4];
        const role_or_user = response.Arn.split(':')[5].split('/')[1];

        const connected = `${middlewares.colorMiddleware.cyan}Connected To ${middlewares.colorMiddleware.yellow}'AWS'`;
        const succ = `${middlewares.colorMiddleware.cyan}Successfully${middlewares.colorMiddleware.reset}`;
        const loc = `at ${middlewares.colorMiddleware.green} user/role '${role_or_user}' region '${region}' using local profile '${profile}' ${middlewares.colorMiddleware.reset}`;
        // const user_role = userServices.updateUserRole(role_or_user);
        // middlewares.llog(`${user_role}`, 'yellow', 'aws');
        middlewares.llog(`Using '${profile}' profile with region '${region}'`, 'yellow', 'aws');
        middlewares.llog(`${connected} ${succ} ${loc}`, 'green', 'aws');
        return { account, role_or_user, profile, region };
      }
    } catch (error) {
      middlewares.llog(`Not Connected to AWS '${error}'`, 'red', 'aws');
    }
  }
}

module.exports = AWSManager;
