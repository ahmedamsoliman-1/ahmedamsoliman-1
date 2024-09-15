const express = require('express');
const axios = require('axios');


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




router.get('/health', middlewares.fetchAllServices, async (req, res) => {
    const timeout = 5000; 
    const checkHealth = async (url) => {
        try {
            const response = await axios.get(url, { timeout });
            return { url, status: response.status };
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                return { url, status: 'Timeout' };
            } else {
                return { url, status: error.response ? error.response.status : 'Error' };
            }
        }
    };

    const healthChecks = await Promise.all(req.services.map(service => checkHealth(service.url)));

    const servicesWithStatus = req.services.map((service, index) => ({
        ...service,
        status: healthChecks[index].status
    }));

    ll.llog(`Total ${servicesWithStatus.length} svc to check for health`);

    res.render('health', {
        pageTitle: 'Svc Health',
        node: node,
        services: servicesWithStatus
    });
});





router.get('/', middlewares.fetchAllServices, (req, res) => {
    ll.llog(`Combined services return :: Total ${req.services.length}`);
    ll.llog(`Main page rendered on ${node}`);
    res.render('index', {
        pageTitle: '',
        node: node,
        svgs: svgs,
        services: req.services
    });
});



module.exports = router;
