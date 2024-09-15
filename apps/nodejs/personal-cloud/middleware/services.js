const axios = require('axios');
const fs = require('fs');
const ll = require('./utils');
const config = require('../middleware/config');

middlewares = {}

const getRenderDeployments = async () => {
    const response = await axios.get('https://api.render.com/v1/services?limit=20', {
        headers: {
            Authorization: `Bearer ${config.RENDER_TOKEN}`
        }
    });
    
    const services = response.data.map(service => ({
        name: service.service.name,
        url: `https://${service.service.name}.onrender.com/`
    }));
    
    return services;
};
const getVercelDeployments = async () => {
    const response = await axios.get('https://api.vercel.com/v9/projects', {
        headers: {
            Authorization: `Bearer ${config.VERCEL_TOKEN}`
        }
    });

    // Extracting necessary data: project name and URL
    const services = response.data.projects.map(project => ({
        name: project.name,
        url: `https://${project.name}.vercel.app/`
    }));

    return services;
};






const getGithubPagesDeployments = async () => {
    try {
        const response = await axios.get('https://api.github.com/user/repos', {
            headers: {
                Authorization: `token ${config.GITHUB_TOKEN}`
            }
        });

        // Extract necessary data: repository name and URL, but only include repos with a homepage URL
        const repositories = response.data
            .filter(repo => repo.homepage) // Only include repos with a homepage URL
            .map(repo => ({
                name: repo.full_name,
                url: repo.homepage,
                repo: repo.html_url,
            }));

        return repositories;
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        return [];
    }
};










middlewares.fetchAllServices = async (req, res, next) => {
    try {
        const [services_render, services_vercel, services_github_pages] = await Promise.all([
            getRenderDeployments(), 
            getVercelDeployments(), 
            getGithubPagesDeployments()
        ]);

        req.services = [
            ...services_render.map(service => ({ ...service, platform: 'render' })),
            ...services_vercel.map(service => ({ ...service, platform: 'vercel' })),
            ...services_github_pages.map(service => ({ ...service, platform: 'github' }))
        ];
        next();
    } catch (error) {
        ll.llog(`Error fetching services: ${error.message}`);
        res.status(500).send('Failed to load services');
    }
};

middlewares.fetchGithubServices = async (req, res, next) => {
    try {
        req.services = await getGithubPagesDeployments();
        next();
    } catch (error) {
        ll.llog(`Error fetching Github services: ${error.message}`);
        res.status(500).send('Failed to load Github services');
    }
};


middlewares.fetchRenderServices = async (req, res, next) => {
    try {
        req.services = await getRenderDeployments();
        next();
    } catch (error) {
        ll.llog(`Error fetching Render services: ${error.message}`);
        res.status(500).send('Failed to load Render services');
    }
};

middlewares.fetchVercelServices = async (req, res, next) => {
    try {
        req.services = await getVercelDeployments();
        next();
    } catch (error) {
        ll.llog(`Error fetching Vercel services: ${error.message}`);
        res.status(500).send('Failed to load Vercel services');
    }
};


module.exports = middlewares;
