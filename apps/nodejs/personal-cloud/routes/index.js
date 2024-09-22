const express = require('express');
const axios = require('axios');


const router = express.Router();
const node = require("os").hostname();
const svgs = require('../SVGs');
const Config = require('../middleware/config');
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


router.get('/docker', middlewares.fetchDockerServices, async (req, res) => {
    ll.llog(`Docker services return :: Total ${req.services.length}`)
    res.render('svc', {
        pageTitle: 'Docker',
        node: node,
        services: req.services
    });
});




router.get('/health', middlewares.fetchAllServices, async (req, res) => {
    const timeout = Config.HEALTH_CHECK_TIMEOUT; 
    ll.llog(`Health check for ${req.services.length} services`);
    ll.llog(`Health check timeout: ${timeout} ms`);

    const checkHealth = async (url) => {
        try {
            const response = await axios.get(url, { timeout });
            return { url, status: response.status };
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                return { url, status: 'Timeout' };
            } else {
                return { 
                    url, 
                    status: error.response ? error.response.status : 'Error' 
                };
            }
        }
    };

    const healthChecks = await Promise.all(req.services.map(service => checkHealth(service.url)));

    const servicesWithStatus = req.services.map((service, index) => ({
        ...service,
        status: healthChecks[index].status
    }));
    console.log(servicesWithStatus);

    ll.llog(`Total ${servicesWithStatus.length} svc to check for health`);

    res.render('health', {
        pageTitle: 'Svc Health',
        node: node,
        services: servicesWithStatus
    });
});





router.get('/', middlewares.fetchAllServices, (req, res) => {
    // Group services by platform
    const platforms = req.services.reduce((acc, service) => {
        acc[service.platform] = acc[service.platform] || [];
        acc[service.platform].push(service);
        return acc;
    }, {});

    // Define platform colors with the updated color scheme
    const platformColors = {
        // orange
        render: '#FFA500',  // Orange
        render: '#FFA500',  // Dark blue
        vercel: '#000000',  // Black
        github: '#b22222',  // Dark red
        dgxk8: '#00aced',
        macdocker: '#28a745'
    };

    ll.llog(`Combined services return :: Total ${req.services.length}`);
    ll.llog(`Main page rendered on ${node}`);

    // Render the index page with grouped services and colors
    res.render('index', {
        pageTitle: 'Service Dashboard',
        node: node,
        svgs: svgs,
        platforms: platforms,
        platformColors: platformColors
    });
});



module.exports = router;
