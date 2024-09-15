const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const axios = require('axios');
const router = express.Router();
const node = require("os").hostname();
const svgs = require('../SVGs');

const ll = require('../middleware/utils');
const config = require('../middleware/config');


router.get('/', (req, res) => {
    ll.llog(`Main page rendered on ${node}`)
    res.render('index', { pageTitle: '', node: node, svgs: svgs});
});






// const render_blueprint = path.join('../../../render.yaml');
const render_blueprint = path.join('render.yaml');
function extractServiceDetails(yamlFilePath) {
    try {
        // Load the YAML file
        const fileContents = fs.readFileSync(yamlFilePath, 'utf8');
        const data = yaml.load(fileContents);

        // Extract service details
        const serviceDetails = data.services.map(service => ({
            name: service.name,
            url: `https://${service.name}.onrender.com/`
        }));

        return serviceDetails;
    } catch (e) {
        console.log(e);
        return [];
    }
}
const getRenderProjects = async () => {
    const response = await axios.get('https://api.render.com/v1/services?limit=20', {
        headers: {
            Authorization: `Bearer ${config.RENDER_TOKEN}`
        }
    });
    return response.data;
}
router.get('/render', async (req, res) => {

    const services = await getRenderProjects();
    ll.llog(`Render services return :: Total ${services.length}`)
    res.render('render', { 
        pageTitle: 'Render', 
        node: node, 
        services: services 
    });
});




const getVercelProjects = async () => {
    const response = await axios.get('https://api.vercel.com/v9/projects', {
        headers: {
            Authorization: `Bearer ${config.VERCEL_TOKEN}`
        }
    });
    return response.data.projects;
};

router.get('/vercel', async (req, res) => {
    const projects = await getVercelProjects();
    ll.llog(`Vercel projects return :: Total ${projects.length}`)
    res.render('vercel', { 
        pageTitle: 'Vercel', 
        node: node, 
        projects: projects 
    });
});


module.exports = router;
