// script_mongo.js

document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the server
    fetch('/mongo/list-dbs')
        .then(response => response.json())
        .then(data => {
            // Extract the databases array from the response
            const databases = data.databases;

            // Get the mongodb div element
            const mongodbDiv = document.getElementById('mongodb');

            // Create an unordered list element
            const ul = document.createElement('ul');

            // Populate the list with the available databases
            databases.forEach(db => {
                const li = document.createElement('li');
                li.textContent = db.name;
                ul.appendChild(li);
            });

            // Replace the loading message with the list of databases
            mongodbDiv.innerHTML = '';
            mongodbDiv.appendChild(ul);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
