const express = require('express');


const router = express.Router();
const node = require("os").hostname();
const svgs = require('../SVGs');

const ll = require('../middleware/utils');
const middlewares = require('../middleware/services');



router.get('/render', middlewares.fetchRenderServices, async (req, res) => {
    ll.llog(`Render services return :: Total ${req.services.length}`)
    res.render('svc', { 
        pageTitle: 'Render', 
        node: node, 
        services: req.services 
    });
});




router.get('/vercel', middlewares.fetchVercelServices, async (req, res) => {
    ll.llog(`Vercel projects return :: Total ${req.services.length}`)
    res.render('svc', { 
        pageTitle: 'Vercel', 
        node: node, 
        services: req.services 
    });
});





router.get('/github', middlewares.fetchGithubServices, async (req, res) => {
    ll.llog(`Github repos return :: Total ${req.services.length}`)
    res.render('svc', {
        pageTitle: 'Github',
        node: node,
        services: req.services
    });
});







router.get('/', middlewares.fetchAllServices, (req, res) => {
    ll.llog(`Combined services return :: Total ${req.services.length}`);
    // console.log(req.services)

    ll.llog(`Main page rendered on ${node}`);
    res.render('index', {
        pageTitle: '',
        node: node,
        svgs: svgs,
        services: req.services
    });
});



module.exports = router;
