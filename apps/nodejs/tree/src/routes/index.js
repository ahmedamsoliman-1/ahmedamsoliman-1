
const express = require('express');
const fs = require('fs');
const path = require('path');
const ll = require('../middleware/utils');

const router = express.Router();

// Function to get the file tree with a specified depth
function getFileTree(dirPath, maxDepth = Infinity, currentDepth = 1) {
  const result = [];
  if (currentDepth > maxDepth) return result;

  const items = fs.readdirSync(dirPath);
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      result.push({
        name: item,
        children: getFileTree(fullPath, maxDepth, currentDepth + 1)
      });
    } else {
      result.push({
        name: item
      });
    }
  });

  return result;
}

const hardcodedPath = '/Users/ahmed.soliman/workspace/ahmed/ahmedamsoliman-1/apps';

router.get('/file-tree', (req, res) => {
  const maxDepth = parseInt(req.query.depth);  // Get depth from query or default to 1
  ll.llog(`Currently working with directory ${hardcodedPath}, Depth: ${maxDepth}`);
  const tree = getFileTree(path.join(hardcodedPath, './'), maxDepth);
  console.log(tree);
  res.json(tree);
});

router.get('/', (req, res) => {
  ll.llog('Rendering file tree view');
  res.render('index', {
    depth: 3,
    dir: hardcodedPath
  });
});



module.exports = router;
