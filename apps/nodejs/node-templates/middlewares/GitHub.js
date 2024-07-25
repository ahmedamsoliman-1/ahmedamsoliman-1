const octokit  = require('../controllers/githubController');

const middlewares = {};


function extractRepoInfo(githubData) {
    const repoInfoList = [];

    if (githubData && githubData.data && Array.isArray(githubData.data)) {
        githubData.data.forEach(repo => {
            const repoInfo = {
                name: repo.name,
                urls: {
                    html_url: repo.html_url,
                    ssh_url: repo.ssh_url,
                    https_url: repo.clone_url,
                }
            };

            repoInfoList.push(repoInfo);
        });
    }

    return repoInfoList;
}

middlewares.getRepos = async function (req, res, next) {
    try {
        const resp = await octokit.repos.listForAuthenticatedUser();
        let repoLinks = extractRepoInfo(resp);

        req.repos_info = repoLinks;
        next();
    } catch (error) {
        console.error('Error fetching repositories:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

middlewares.getRepos2 = async function (req, res) {
    try {
        const resp = await octokit.repos.listForAuthenticatedUser();
        let repoLinks = extractRepoInfo(resp);

        return repoLinks;
    } catch (error) {
        console.error('Error fetching repositories:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = middlewares;
