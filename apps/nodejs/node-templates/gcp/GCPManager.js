const { GoogleAuth } = require('google-auth-library');

const middlewares = require('../middlewares/utils');
const config = require('../config');

class GCPManager {
  constructor() {
    this.auth = new GoogleAuth();
  }

  async checkConnectionToGCP() {
    try {
      const client = await this.auth.getClient();
      const projectId = await this.auth.getProjectId();
      
      if (projectId) {
        const connected = '\x1b[36mConnected To \x1b[33m\'GCP\'';
        const success = '\x1b[36mSuccessfully\x1b[0m';
        const loc = `at \x1b[32mGCP region '${projectId}'\x1b[0m using application default credentials`;
        
        middlewares.llog(`${connected} ${success} ${loc}`, 'green', 'gcp');
        
        return projectId;
      } else {
        console.error('Failed to retrieve project ID.');
      }
    } catch (error) {
      // console.error(`Not connected to GCP: ${error}`);
      const nconnected = '\x1b[31mNot Connected To \x1b[33m\'Google Cloud Platform\'';
      // const loc = `at \x1b[32mGCP region '${projectId}'\x1b[0m using application default credentials`;
      middlewares.llog(`${nconnected}`, 'red', 'gcp');
    }
  }
}


module.exports = GCPManager;
