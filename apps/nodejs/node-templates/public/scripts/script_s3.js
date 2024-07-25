
// function updateTable(table_){
//     fetch(`/s3_info_${table_}`)
//     .then(response => response.json())
//     .then(data => {
//         const modelBackupDiv = document.getElementById(table_);
//         const table = document.createElement('table');
//         table.id = 'backup_table';
//         const tableHeader = table.createTHead();
//         const headerRow = tableHeader.insertRow();
//         ['Number', 'Key', 'Last Modified', 'Size'].forEach(headerText => {
//             const th = document.createElement('th');
//             th.textContent = headerText;
//             headerRow.appendChild(th);
//         });
//         const tableBody = table.createTBody();
//         data.forEach((item, index) => {
//             const row = tableBody.insertRow();
//             const rowData = [index + 1, item.Key, item.LastModified, item.Size];
//             rowData.forEach(cellData => {
//                 const cell = row.insertCell();
//                 cell.textContent = cellData;
//             });
//         });

//         modelBackupDiv.innerHTML = '';
//         modelBackupDiv.appendChild(table);
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });
// }

// function updateTableAppend(table_) {
//     const itemsPerPage = 10; // Number of items to display per page
//     let currentPage = 1; // Current page being displayed
//     let displayedItems = 0; // Track the number of displayed items

//     fetch(`/s3_info_${table_}`)
//         .then(response => response.json())
//         .then(data => {
//             const modelBackupDiv = document.getElementById(table_);
//             const table = document.createElement('table');
//             table.id = 'backup_table';
//             const tableHeader = table.createTHead();
//             const headerRow = tableHeader.insertRow();
//             ['Number', 'Key', 'Last Modified', 'Size'].forEach(headerText => {
//                 const th = document.createElement('th');
//                 th.textContent = headerText;
//                 headerRow.appendChild(th);
//             });
//             const tableBody = table.createTBody();

//             // Function to display a specific range of items
//             const displayItems = () => {
//                 const start = displayedItems;
//                 const end = displayedItems + itemsPerPage;
//                 for (let i = start; i < end; i++) {
//                     if (i >= data.length) {
//                         break;
//                     }
//                     const row = tableBody.insertRow();
//                     const rowData = [i + 1, data[i].Key, data[i].LastModified, data[i].Size];
//                     rowData.forEach(cellData => {
//                         const cell = row.insertCell();
//                         cell.textContent = cellData;
//                     });
//                     displayedItems++;
//                 }
//             };

//             // Function to load items for the next page
//             const loadMoreItems = () => {
//                 displayItems();
//                 currentPage++;
//                 if (displayedItems >= data.length) {
//                     loadMoreBtn.style.display = 'none'; // Hide the button when all items are displayed
//                 }
//             };

//             displayItems(); // Display the first page of items

//             const loadMoreBtn = document.createElement('button');
//             loadMoreBtn.textContent = 'Load More';
//             loadMoreBtn.addEventListener('click', loadMoreItems);

//             modelBackupDiv.innerHTML = '';
//             modelBackupDiv.appendChild(table);
//             modelBackupDiv.appendChild(loadMoreBtn);
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// }


// function updateTable(table_) {
//     const itemsPerPage = 10;
//     let currentPage = 1;
//     let data;

//     const modelBackupDiv = document.getElementById(table_);
//     const paginationDiv = document.createElement('div');

//     const displayItems = () => {
//         const table = document.createElement('table');
//         table.id = 'backup_table';
//         const tableHeader = table.createTHead();
//         const headerRow = tableHeader.insertRow();
//         ['Number', 'Key', 'Last Modified', 'Size'].forEach(headerText => {
//             const th = document.createElement('th');
//             th.textContent = headerText;
//             headerRow.appendChild(th);
//         });
//         const tableBody = table.createTBody();

//         const start = (currentPage - 1) * itemsPerPage;
//         const end = start + itemsPerPage;
//         for (let i = start; i < end; i++) {
//             if (i >= data.length) {
//                 break;
//             }
//             const row = tableBody.insertRow();
//             const rowData = [i + 1, data[i].Key, data[i].LastModified, data[i].Size];
//             rowData.forEach(cellData => {
//                 const cell = row.insertCell();
//                 cell.textContent = cellData;
//             });
//         }

//         const tableContainer = document.createElement('div');
//         tableContainer.appendChild(table);

//         const infoDiv = document.createElement('div');
//         infoDiv.innerHTML = `
//             <p>Number of items per page: ${itemsPerPage}</p>
//             <p>Number of all pages: ${Math.ceil(data.length / itemsPerPage)}</p>
//             <p>Number of all items: ${data.length}</p>
//         `;

//         modelBackupDiv.innerHTML = '';
//         modelBackupDiv.appendChild(tableContainer);
//         modelBackupDiv.appendChild(infoDiv);
//         modelBackupDiv.appendChild(paginationDiv);
//     };

//     const fetchAndUpdate = () => {
//         fetch(`/s3_info_${table_}`)
//             .then(response => response.json())
//             .then(responseData => {
//                 data = responseData;
//                 displayItems();
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     };

//     const prevPageBtn = document.createElement('button');
//     prevPageBtn.classList = "btn btn-success"
//     prevPageBtn.textContent = 'Previous';
//     prevPageBtn.addEventListener('click', () => {
//         if (currentPage > 1) {
//             currentPage--;
//             displayItems();
//         }
//     });

//     const nextPageBtn = document.createElement('button');
//     nextPageBtn.classList = "btn btn-success"
//     nextPageBtn.textContent = 'Next';
//     nextPageBtn.addEventListener('click', () => {
//         const totalPages = Math.ceil(data.length / itemsPerPage);
//         if (currentPage < totalPages) {
//             currentPage++;
//             displayItems();
//         }
//     });

//     const refreshBtn = document.createElement('button');
//     refreshBtn.classList = "btn btn-warning"
//     refreshBtn.textContent = 'Refresh';
//     refreshBtn.addEventListener('click', fetchAndUpdate);

//     paginationDiv.appendChild(prevPageBtn);
//     paginationDiv.appendChild(nextPageBtn);
//     paginationDiv.appendChild(refreshBtn);

//     fetchAndUpdate();
// }

// updateTable("model_backup")
// updateTable("logs_backup")
// updateTable("gpd_backup")



function fetchS3Info() {
    fetch('/s3_info_content')
        .then(response => response.json())
        .then(data => {
            const contentCount = data.metadata.KeyCount;
            const isTruncated = data.metadata.IsTruncated;
            const maxKeys = data.metadata.MaxKeys;
            const bucketName = data.metadata.Name;
            const prefix = data.metadata.Prefix;

            const s3InfoDiv = document.getElementById('s3_info');

            // Remove the loading text
            s3InfoDiv.innerHTML = '';

            // Create the table dynamically
            const table = document.createElement('table');
            const tableContent = `
                <tr>
                    <th>Bucket Name</th>
                    <td>${bucketName}</td>
                </tr>
                <tr>
                    <th>Prefix</th>
                    <td>${prefix}</td>
                </tr>
                <tr>
                    <th>Number of Items</th>
                    <td>${contentCount}</td>
                </tr>
                <tr>
                    <th>Is Truncated</th>
                    <td>${isTruncated}</td>
                </tr>
                <tr>
                    <th>Max Keys</th>
                    <td>${maxKeys}</td>
                </tr>
            `;

            table.innerHTML = tableContent;
            s3InfoDiv.appendChild(table);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    fetchS3Info();
});
