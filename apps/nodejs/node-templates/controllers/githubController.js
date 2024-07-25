// controllers/githubController.js
const { Octokit } = require('@octokit/rest');
const middleare = require('../middlewares/utils');
const config = require('../config');

const octokit = new Octokit({
  auth: config.GITHUB.GITHUB_ACCESS_TOKEN,
});

const checkGitHubConnection = async () => {
  try {
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const connected = `- ${middleare.colorMiddleware.cyan}Connected To ${middleare.colorMiddleware.yellow}'GitHub'`;
    const succ = `${middleare.colorMiddleware.cyan}Successfully${middleare.colorMiddleware.reset}`;
    
    await octokit.users.getAuthenticated();

    console.log(time, connected, succ);
  } catch (error) {
    
    const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
    const nconnected = `- ${middleare.colorMiddleware.red}Not Connected To ${middleare.colorMiddleware.yellow}'GitHub'`;
    const succ = `${middleare.colorMiddleware.red}Successfully${middleare.colorMiddleware.reset}`;
    
    console.log(time, nconnected, succ);

  }
};

checkGitHubConnection();

module.exports = octokit;
