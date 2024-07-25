async function populateCassandraData(which_cassandra) {
  console.log(`Using ${which_cassandra} cassnadra DB`);
  try {
    const response = await fetch(`/cassandra_keyspace_and_tables?which_cassandra=${which_cassandra}`);
    const data = await response.json();

    const cassandraDiv = document.getElementById('cassandra');

    Object.keys(data).forEach(keyspace => {
      const keyspaceDiv = document.createElement('div');
      keyspaceDiv.innerHTML = `<h3>${keyspace}</h3>`;

      const tablesList = document.createElement('ul');
      data[keyspace].forEach(tableData => {
        const tableItem = document.createElement('li');
        tableItem.textContent = `${tableData.table_name} - ${tableData.row_count}`;
        tablesList.appendChild(tableItem);
      });

      keyspaceDiv.appendChild(tablesList);
      cassandraDiv.appendChild(keyspaceDiv);

      populateCassandra_key_space_1_table_metadata(keyspace)

    });

  } catch (error) {
    console.error('Error fetching or rendering data:', error);
  }
}


async function populateCassandra_key_space_1_table_metadata(keyspace) {
  try {
    const responseTables = await fetch(`/cassandra_tables_for_keyspace?keyspace=${keyspace}`);
    const tablesData = await responseTables.json();

    for (const table of tablesData.tables) {
      const tableTitle = document.createElement('h3');
      tableTitle.textContent = table.table_name;
      const cassandraDiv = document.getElementById('cassandra-table');
      cassandraDiv.appendChild(tableTitle); 

      try {
        const response = await fetch(`/cassandra_tables?table=${table.table_name}&keyspace=${keyspace}`);
        const tableContent = await response.json();

        const initialRowCount = 10; 
        const tableElement = document.createElement('table');
        tableElement.classList.add('cassandra-table');
        tableElement.style.fontSize = '10px'; 
        tableElement.style.borderCollapse = 'collapse';

        const headerRow = document.createElement('tr');
        for (const key in tableContent.rows[0]) {
          const headerCell = document.createElement('th');
          headerCell.textContent = key;
          headerCell.style.padding = '3px'; 
          headerRow.appendChild(headerCell);
        }
        tableElement.appendChild(headerRow);

        // Create table rows
        if (table.table_name === 'cs2_logs_table') {
          tableContent.rows.sort((a, b) => {
            // Assuming 'timestamp' is the field to sort on
            return new Date(b.timestamp) - new Date(a.timestamp);
          });
        }

        let rowsDisplayed = 0;
        tableContent.rows.forEach((row, index) => {
          if (rowsDisplayed < initialRowCount) {
            const rowElement = document.createElement('tr');
            for (const key in row) {
              const cell = document.createElement('td');
              cell.textContent = row[key];
              cell.style.padding = '3px'; // Adjust cell padding
              rowElement.appendChild(cell);
            }
            tableElement.appendChild(rowElement);
            rowsDisplayed++;
          }
        });

        cassandraDiv.appendChild(tableElement);

        if (tableContent.rows.length > initialRowCount) {
          const seeMoreButton = document.createElement('button');
          seeMoreButton.classList = "btn btn-success"
          seeMoreButton.textContent = 'More';
          seeMoreButton.addEventListener('click', () => {
            const additionalRows = 10;
            let rowsAdded = 0;
            tableContent.rows.slice(rowsDisplayed).some((row, index) => {
              if (rowsAdded < additionalRows) {
                const rowElement = document.createElement('tr');
                for (const key in row) {
                  const cell = document.createElement('td');
                  cell.textContent = row[key];
                  cell.style.padding = '3px'; // Adjust cell padding
                  rowElement.appendChild(cell);
                }
                tableElement.appendChild(rowElement);
                rowsDisplayed++;
                rowsAdded++;
              } else {
                return true; // Break out of the loop after adding additionalRows
              }
            });
            seeMoreButton.style.display = rowsDisplayed >= tableContent.rows.length ? 'none' : 'block';
          });
          cassandraDiv.appendChild(seeMoreButton);
        }
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    }
  } catch (error) {
    console.error('Error fetching tables data for keyspace:', error);
  }
}

// console.log('which_cassandra');
// console.log(which_cassandra);
// populateCassandraData('alpha');