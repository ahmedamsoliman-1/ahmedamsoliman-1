const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const node = require("os").hostname();
const svgs = require('../SVGs');

const servicesFilePath = path.join(__dirname, 'port_forward_conf.json');

// Utility function to read services from file
const readServicesFromFile = () => {
    const data = fs.readFileSync(servicesFilePath);
    return JSON.parse(data);
};


const dnss = {
    'paperless': "https://ai-demi00.avrioc.io",
    'overleaf': "https://ai-demi01.avrioc.io",
    'n_a': "https://ai-demi02.avrioc.io",
    'social-media-agent-live': "https://ai-demi03.avrioc.io",
    'n_a': "https://ai-demi04.avrioc.io",
    'n_a': "https://ai-demi05.avrioc.io",
    'n_a': "https://ai-demi06.avrioc.io",
    'n_a': "https://ai-demi07.avrioc.io",
}

router.get('/', (req, res) => {
    const services = readServicesFromFile();
    const namespaces = {};

    // Group services by namespace
    for (const [key, service] of Object.entries(services)) {
        if (!namespaces[service.namespace]) {
            namespaces[service.namespace] = [];
        }
        namespaces[service.namespace].push({ name: key, ...service, dns: dnss[key] });
    }
    // console.log(namespaces);

    res.render('index', { pageTitle: '', node: node, svgs: svgs, namespaces: namespaces });
});

module.exports = router;
