// Function to create a repository card element
function createRepoCard(repo) {
    const repoCard = document.createElement('div');
    repoCard.classList.add('repo-card');

    const title = document.createElement('h3');
    title.textContent = repo.name;

    const urlButton = createButton('URL', repo.urls.html_url, '_blank', 'btn');
    const sshButton = createCopyButton('SSH URL', repo.urls.ssh_url, 'btn');
    const httpsButton = createCopyButton('HTTPS URL', repo.urls.https_url, 'btn');

    repoCard.appendChild(title);
    repoCard.appendChild(urlButton);
    repoCard.appendChild(sshButton);
    repoCard.appendChild(httpsButton);

    return repoCard;
}

// Function to create a button element
function createButton(label, url, target, className) {
    const button = document.createElement('button');
    button.textContent = label;
    button.classList.add(className);
    button.addEventListener('click', () => window.open(url, target));
    return button;
}

// Function to create a copy button element
function createCopyButton(label, url, className) {
    const button = document.createElement('button');
    button.textContent = label;
    button.classList.add(className);
    button.addEventListener('click', () => copyToClipboard(url, label));
    return button;
}

// Function to copy text to clipboard and display notification using Toastify
function copyToClipboard(text, label) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    Toastify({
        text: `Copied ${label} to clipboard: ${text}`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        close: true
    }).showToast();
}

// Function to render repository cards
function renderRepoCards(reposInfo) {
    const githubContainer = document.getElementById('github');

    if (githubContainer) {
        reposInfo.forEach(repo => {
            const repoCard = createRepoCard(repo);
            githubContainer.appendChild(repoCard);
        });
    }
}





// Fetch GitHub repository data and then render the cards
async function fetchAndRenderRepos() {
    try {
        const response = await fetch('/github-get-repos'); // Update the URL to match your Express route
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const reposInfo = await response.json();
        renderRepoCards(reposInfo);
    } catch (error) {
        console.error('Error fetching GitHub repository data:', error.message);
    }
}

// Call the function to fetch and render repository cards
fetchAndRenderRepos();
