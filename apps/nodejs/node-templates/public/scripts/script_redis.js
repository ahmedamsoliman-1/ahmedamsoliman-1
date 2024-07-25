function organizeKeysByKeyspace(keys) {
  const organizedKeys = {};
  keys.forEach(key => {
      const [keyspace, actualKey] = key.split(':');
      if (!organizedKeys[keyspace]) {
          organizedKeys[keyspace] = [];
      }
      organizedKeys[keyspace].push(actualKey);
  });
  return organizedKeys;
}

function redisKeysGetAll() {
  fetch('/redis/get/all')
      .then(response => response.json())
      .then(data => {
          const keysList = document.getElementById('keysList');
          keysList.innerHTML = ''; // Clear previous content
          const organizedKeys = organizeKeysByKeyspace(data);
          for (const keyspace in organizedKeys) {
              if (Object.hasOwnProperty.call(organizedKeys, keyspace)) {
                  const keyspaceDiv = document.createElement('div');
                  keyspaceDiv.classList.add('keyspaceDiv');

                  const keyspaceHeader = document.createElement('h2');
                  keyspaceHeader.textContent = keyspace;

                  const keyspaceContentDiv = document.createElement('div');
                  keyspaceContentDiv.classList.add('keyspaceContentDiv', 'hidden');

                  keyspaceHeader.addEventListener('click', () => {
                      keyspaceContentDiv.classList.toggle('hidden');
                  });

                  organizedKeys[keyspace].forEach(actualKey => {
                      const keyDiv = document.createElement('div');
                      keyDiv.classList.add('keyDiv');

                      const keyHeader = document.createElement('p');
                      keyHeader.textContent = actualKey;

                      const displayButton = document.createElement('button');
                      displayButton.textContent = 'Show Content';
                      displayButton.classList.add('btn', 'btn-primary', 'btn-sm');
                      displayButton.addEventListener('click', () => {
                          fetch(`/redis/get/${keyspace}:${actualKey}`)
                              .then(response => response.text())
                              .then(content => {
                                  alert(`Content of ${keyspace}:${actualKey}: ${content}`);
                              })
                              .catch(error => {
                                  console.error('Error fetching content:', error);
                                  alert('Failed to fetch content');
                              });
                      });

                      const deleteButton = document.createElement('button');
                      deleteButton.textContent = 'Delete';
                      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
                      deleteButton.addEventListener('click', () => {
                          fetch(`/redis/delete/${keyspace}:${actualKey}`, { method: 'DELETE' })
                              .then(response => {
                                  if (response.ok) {
                                      keyDiv.remove();
                                  } else {
                                      throw new Error('Failed to delete key');
                                  }
                              })
                              .catch(error => {
                                  console.error('Error deleting Redis key:', error);
                              });
                      });

                      keyDiv.appendChild(keyHeader);
                      keyDiv.appendChild(displayButton);
                      keyDiv.appendChild(deleteButton);
                      keyspaceContentDiv.appendChild(keyDiv);
                  });

                  keyspaceDiv.appendChild(keyspaceHeader);
                  keyspaceDiv.appendChild(keyspaceContentDiv);
                  keysList.appendChild(keyspaceDiv);
              }
          }
      })
      .catch(error => {
          console.error('Error fetching Redis keys:', error);
      });
}

redisKeysGetAll();
