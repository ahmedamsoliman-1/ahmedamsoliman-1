const { KubeConfig, CoreV1Api } = require('@kubernetes/client-node');
const express = require('express');
var router = express.Router();
require('dotenv').config();
const config = require('../../config');

const kubeconfig = new KubeConfig();
kubeconfig.loadFromFile(config.K8.K8_KUBECONFIG_FILE);
const k8sCoreApi = kubeconfig.makeApiClient(CoreV1Api);



router.get('/k8', async (req, res) => {
  const namespaces = await listNamespaces();
  const context = await k8Context();
  res.render('k8/k8', {
    user: req.user, 
    time: new Date(),
    pageTitle: 'K8',
    namespaces: namespaces,
    context: context
  });
  res.locals.message = `External Main Page Loaded!`;
});


router.get('/k8/list-pods', async (req, res) => {
  const pods = await listPods(req, res);
  res.send(pods);
});

router.get('/k8/list-namespaces', async (req, res) => {
  const namespaces = await listNamespaces();
  res.send(namespaces);
});


router.get('/k8/list-services', async (req, res) => {
  const services = await listServices(req, res);
  res.send(services);
});



async function k8Context() {
  try {
    return await kubeconfig.getCurrentContext();
  } catch (error) {
    console.error('Error listing contexts:', error);
    throw error;
  }
}

async function listNamespaces() {
  try {
    const response = await k8sCoreApi.listNamespace();
    const namespaceNames = response.body.items.map(namespace => namespace.metadata.name);
    return namespaceNames;
  } catch (error) {
    console.error('Error listing namespaces:', error);
    throw error;
  }
}

async function listPods(req, res) {
  const namespace = req.query.namespace || 'default';

  try {
    const response = await k8sCoreApi.listNamespacedPod(namespace);

    const podInfo = response.body.items.map(pod => ({
      name: pod.metadata.name,
      ready: pod.status.containerStatuses.map(c => c.ready).join(', '),
      status: pod.status.phase,
      restarts: pod.status.containerStatuses.reduce((acc, c) => acc + c.restartCount, 0),
      age: pod.metadata.creationTimestamp,
    }));

    return podInfo;
  } catch (error) {
    console.error('Error listing pods:', error);
    throw error;
  }
}

async function listServices(req, res) {
  const namespace = req.query.namespace || 'default';

  try {
    const response = await k8sCoreApi.listNamespacedService(namespace);
    const serviceInfo = response.body.items.map(service => ({
      name: service.metadata.name,
      type: service.spec.type,
      ports: service.spec.ports.map(port => `${port.name}: ${port.port}`).join(', '),
      age: service.metadata.creationTimestamp,
      cluster_ip: service.spec.clusterIP,
    }));

    return serviceInfo;
  } catch (error) {
    console.error('Error listing services:', error);
    throw error;
  }
}

module.exports = router;