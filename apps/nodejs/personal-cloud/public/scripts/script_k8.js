// Function to fetch services based on namespace
async function listServices(namespace) {
    try {
        const response = await fetch(`/k8/list-services?namespace=${namespace}`);
        const services = await response.json();
        return services;
    } catch (error) {
        console.error('Error fetching services:', error);
        throw error;
    }
}
// Function to fetch pods based on namespace
async function listPods(namespace) {
    try {
        const response = await fetch(`/k8/list-pods?namespace=${namespace}`);
        const pods = await response.json();
        return pods;
    } catch (error) {
        console.error('Error fetching pods:', error);
        throw error;
    }
}
// Function to render services
function renderServices(services) {
    const serviceList = document.getElementById('serviceList');
    serviceList.innerHTML = ''; // Clear previous content
    services.forEach(service => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Name:</strong> ${service.name}<br>
            <strong>Type:</strong> ${service.type}<br>
            <strong>Ports:</strong> ${service.ports}<br>
            <strong>Age:</strong> ${service.age}<br>
            <strong>Cluster IP:</strong> ${service.cluster_ip}<br>
        `;
        // Apply inline styles to the list item
        li.style.padding = '10px';
        li.style.border = '1px solid #ccc';
        li.style.borderRadius = '5px';
        li.style.marginBottom = '10px';
        serviceList.appendChild(li);
    });
}

// Function to render pods
function renderPods(pods) {
    const podList = document.getElementById('podList');
    podList.innerHTML = ''; // Clear previous content
    pods.forEach(pod => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Name:</strong> ${pod.name}<br>
            <strong>Ready:</strong> ${pod.ready}<br>
            <strong>Status:</strong> ${pod.status}<br>
            <strong>Restarts:</strong> ${pod.restarts}<br>
            <strong>Age:</strong> ${pod.age}<br>
        `;
        // Apply inline styles to the list item
        li.style.padding = '10px';
        li.style.border = '1px solid #ccc';
        li.style.borderRadius = '5px';
        li.style.marginBottom = '10px';
        podList.appendChild(li);
    });
}

// Event listener for form submission
document.getElementById('submitBtn').addEventListener('click', async () => {
    const namespaceSelect = document.getElementById('namespaceSelect');
    const selectedNamespace = namespaceSelect.value;
    // Display selected namespace for services
    document.getElementById('selectedNamespace').textContent = selectedNamespace;
    // Display selected namespace for pods
    document.getElementById('selectedNamespacePods').textContent = selectedNamespace;
    // Fetch and render services
    const services = await listServices(selectedNamespace);
    renderServices(services);
    // Fetch and render pods
    const pods = await listPods(selectedNamespace);
    renderPods(pods);
});