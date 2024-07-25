// const Gitlab = require('node-gitlab-api');
// const {Gitlab} = require('node-gitlab-api/dist/es5').default;

// const Gitlab = require('gitlab');



// const api = new Gitlab({
//     host: process.env.GITLAB_HOST,
//   token: process.env.GITLAB_ACCESS_TOKEN,
// });

const middlewares = {};

// middlewares.getRepos = async function (req, res, next) {
//     try {
//         const { data: repos } = await gitlab.Projects.all();
//         console.log(data);
//         req.repos = 'repos';
//         next();
//     } catch (error) {
//         console.error('Error fetching repositories:', error.message);
//         res.status(500).send('Internal Server Error');
//     }
// };

module.exports = middlewares;
