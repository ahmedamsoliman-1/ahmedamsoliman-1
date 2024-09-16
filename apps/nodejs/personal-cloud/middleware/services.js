const axios = require('axios');
const ll = require('./utils');
const config = require('../middleware/config');

const Docker = require('dockerode');
const docker = new Docker();



const getDockerServices = async () => {
    try {
        // Attempt to list Docker containers
        const containers = await docker.listContainers({ all: false });

        // Map the containers to a suitable format
        const mappedContainers = containers.map(container => {
            let publicPort = '';
            if (container.Ports && container.Ports.length > 0) {
                const portMapping = container.Ports.find(port => port.PublicPort);
                if (portMapping) {
                    publicPort = portMapping.PublicPort;
                }
            }

            const url = publicPort ? `http://localhost:${publicPort}` : '';

            return {
                id: container.Id,
                name: container.Names[0].replace(/^\//, ''),
                image: container.Image,
                status: container.Status,
                port: publicPort,
                url: url
            };
        });

        return mappedContainers;

    } catch (error) {

        // Handle specific Docker connection error
        if (error.code === 'ENOENT' && error.message.includes('/var/run/docker.sock')) {
            ll.llog('Docker is not running or Docker socket file is missing.');

            // Return an empty array if Docker is not available
            return [];
        } else {
            // Handle other errors
            console.error('Error fetching Docker containers:', error);

            // Return an empty array in case of other errors as well
            return [];
        }
    }
};





const getRenderDeployments = async () => {
    const response = await axios.get('https://api.render.com/v1/services?limit=20', {
        headers: {
            Authorization: `Bearer ${config.RENDER_TOKEN}`
        }
    });
    
    const services = response.data.map(service => ({
        name: service.service.name,
        repo: config.BASE + service.service.rootDir,
        url: `https://${service.service.name}.onrender.com/`,
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

        const repositories = response.data
            .filter(repo => repo.homepage)
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






middlewares = {}





middlewares.fetchAllServices = async (req, res, next) => {
    try {
        const [
            services_render, 
            services_vercel, 
            services_github_pages, 
            services_mac_docker
        ] = await Promise.all([
            getRenderDeployments(), 
            getVercelDeployments(), 
            getGithubPagesDeployments(),
            getDockerServices()
        ]);

        req.services = [
            ...services_render.map(service => ({ ...service, platform: 'render' })),
            ...services_vercel.map(service => ({ ...service, platform: 'vercel' })),
            ...services_github_pages.map(service => ({ ...service, platform: 'github' })),
            ...services_mac_docker.map(service => ({ ...service, platform: 'macdocker' }))
        ];
        
        next();
    } catch (error) {
        console.error(`Error fetching services: ${error.message}`);
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

middlewares.fetchDockerServices = async (req, res, next) => {
    try {
        req.services = await getDockerServices();
        next();
    } catch (error) {
        ll.llog(`Error fetching Docker services: ${error.message}`);
        res.status(500).send('Failed to load Docker services');
    }
};


module.exports = middlewares;
