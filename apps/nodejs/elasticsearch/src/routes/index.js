const express = require('express');
const router = express.Router();
const ll = require('../middleware/utils');
const es_middlewares = require('../middleware');

router.use(es_middlewares.list_es_indices);
router.use(es_middlewares.list_index_contents);

router.get('/', (req, res) => {
    const indices = res.locals.indices;
    const indexContents = res.locals.indexContents;

    res.render('index', { indices: indices, indexContents: indexContents });
    ll.llog('Index page rendered');
});

module.exports = router;
