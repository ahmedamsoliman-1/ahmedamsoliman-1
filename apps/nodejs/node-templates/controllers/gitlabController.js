// controllers/gitlabController.js
const { Gitlab } = require('@gitbeaker/node');
const middleare = require('../middlewares/utils');


// const checkGitLabConnection = async () => {
//   try {
//     const time = `${middleare.colorMiddleware.magenta}${middleare.nowMiddleware}${middleare.colorMiddleware.reset}`;
//     const connected = `- ${middleare.colorMiddleware.cyan}Connected To ${middleare.colorMiddleware.yellow}'GitLab'`;
//     const succ = `${middleare.colorMiddleware.cyan}Successfully${middleare.colorMiddleware.reset}`;

//     // Attempt to make a request to GitLab to check the connection
//     const users = await gitlab.Users.current();
//     console.log(users)

//     console.log(time, connected, succ);
//   } catch (error) {
//     console.error('Error connecting to GitLab:', error);
//   }
// };

// // Call the function to check the connection when this module is imported
// checkGitLabConnection();

module.exports = GitlabClient;
