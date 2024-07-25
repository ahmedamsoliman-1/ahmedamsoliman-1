const express = require('express');
var router = express.Router();

const { exec } = require('child_process');
const SVGs = require('../../SVGs')


const authController = require('../../controllers/authController');


router.get('/git',  (req, res) => {
  exec('git branch', (errBranch, stdoutBranch, stderrBranch) => {
    if (errBranch) {
      console.error(`Error executing branch command: ${errBranch}`);
      return;
    }
    const branches = stdoutBranch.split('\n').map(branch => branch.trim());

    exec('git rev-parse --abbrev-ref HEAD', (errCurrentBranch, stdoutCurrentBranch, stderrCurrentBranch) => {
      if (errCurrentBranch) {
        console.error(`Error executing current branch command: ${errCurrentBranch}`);
        return;
      }
      const currentBranch = stdoutCurrentBranch.trim();

      exec('git status --porcelain', (errStatus, stdoutStatus, stderrStatus) => {
        if (errStatus) {
          console.error(`Error executing status command: ${errStatus}`);
          return;
        }
        const status = stdoutStatus.trim().split('\n');

        exec('git remote -v', (errRemote, stdoutRemote, stderrRemote) => {
          if (errRemote) {
            console.error(`Error executing remote command: ${errRemote}`);
            return;
          }
          const remotes = stdoutRemote.trim().split('\n');

          res.render('git/git', { 
            user: req.user, 
            time: new Date(),
            pageTitle: 'Git', 
            currentBranch: currentBranch, 
            branches: branches, 
            status: status, 
            remotes: remotes,
            svgs: SVGs,
          });
          res.locals.message = `Git Main Page Loaded!`;
        });
      });
    });
  });
});


router.get('/git/update-git', (req, res) => {
  exec('git add . && git commit -m "A"', (errRemote, stdoutRemote, stderrStatus) => {
    if (errRemote) {
      console.error(`Error executing remote command: ${errRemote}`);
      return;
    }
    console.log(stdoutRemote);
  });
  res.redirect('/git');
});

router.get('/git/git-status', (req, res) => {
  exec('git status', (errRemote, stdoutRemote, stderrStatus) => {
    if (errRemote) {
      console.error(`Error executing remote command: ${errRemote}`);
      return;
    }
    console.log(stdoutRemote);
  });
  res.redirect('/git');
});

module.exports = router;