
const express = require('express');
const fs = require('fs');
const path = require('path');
const ll = require('../middleware/utils');

const router = express.Router();

// Function to get the file tree
function getFileTree(dirPath) {
  const result = [];
  const items = fs.readdirSync(dirPath);

  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      result.push({
        name: item,
        children: getFileTree(fullPath)
      });
    } else {
      result.push({
        name: item
      });
    }
  });

  return result;
}

router.get('/file-tree', (req, res) => {
  ll.llog(`Currently working with directory ${__dirname}`);
  const tree = getFileTree(path.join(__dirname, '../')); 
  res.json(tree);
});

router.get('/', (req, res) => {
  ll.llog('Rendering file tree view');
  res.render('index');
});


module.exports = router;
