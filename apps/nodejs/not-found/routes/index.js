const express = require('express');
// const fs = require('fs');
// const path = require('path');
const router = express.Router();
const node = require("os").hostname();
// const svgs = require('../SVGs');


router.get('/', (req, res) => {
    res.render('index', { pageTitle: '', node: node });
});

module.exports = router;
