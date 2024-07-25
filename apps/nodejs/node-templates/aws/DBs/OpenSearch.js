const { OpenSearchClient, ListDomainNamesCommand } = require('@aws-sdk/client-opensearch');
const { Client } = require('@opensearch-project/opensearch');
const AWSManager = require('../AWSManager');
const config = require('../../config');

class OpenSearchManager extends AWSManager {
  constructor() {
    super();
    this.osClient = new OpenSearchClient({
      region: this.region,
      credentials: this.credentials,
    });

    this.client = new Client({
      node: `https://${config.OPENSEARCH.OPENSEARCH_HOST}`,
      ssl: {
        rejectUnauthorized: false,
      },
      requestTimeout: 600,
      awsAuth: {
        credentials: this.credentials,
        region: this.region,
      },
    });
  }

  async listDomains() {
    try {
      const command = new ListDomainNamesCommand({});
      const response = await this.osClient.send(command);
      return response.DomainNames.map(domain => domain.DomainName);
    } catch (error) {
      console.error('Error listing OpenSearch domains:', error);
      throw error;
    }
  }

  async createIndex(indexName, settings = {}, mappings = {}) {
    try {
      const body = {
        settings,
        mappings,
      };

      const response = await this.client.indices.create({
        index: indexName,
        body,
      });
      console.log('Index created:', response);
      return response;
    } catch (error) {
      console.error('Error creating index:', error);
      throw error;
    }
  }

  async updateAlias(aliasName, indexName) {
    try {
      const response = await this.client.indices.updateAliases({
        body: {
          actions: [
            { add: { index: indexName, alias: aliasName } },
          ],
        },
      });
      console.log('Alias updated:', response);
      return response;
    } catch (error) {
      console.error('Error updating alias:', error);
      throw error;
    }
  }

  async insertRecord(indexName, record) {
    try {
      const response = await this.client.index({
        index: indexName,
        body: record,
      });
      console.log('Record inserted:', response);
      return response;
    } catch (error) {
      console.error('Error inserting record:', error);
      throw error;
    }
  }

  async bulkInsert(indexName, records) {
    try {
      const bulkBody = [];
      records.forEach(record => {
        bulkBody.push({ index: { _index: indexName } });
        bulkBody.push(record);
      });

      const response = await this.client.bulk({
        body: bulkBody,
      });
      console.log('Bulk insert completed:', response);
      return response;
    } catch (error) {
      console.error('Error in bulk insert:', error);
      throw error;
    }
  }

  async deleteIndex(indexName) {
    try {
      const response = await this.client.indices.delete({
        index: indexName,
      });
      console.log('Index deleted:', response);
      return response;
    } catch (error) {
      console.error('Error deleting index:', error);
      throw error;
    }
  }

  async search(indexName, query) {
    try {
      const response = await this.client.search({
        index: indexName,
        body: query,
      });
      console.log('Search completed:', response);
      return response.hits.hits;
    } catch (error) {
      console.error('Error searching index:', error);
      throw error;
    }
  }

  async createIndicesWithAliases(indexConfigurations) {
    try {
      for (const alias in indexConfigurations) {
        if (indexConfigurations.hasOwnProperty(alias)) {
          const { settings, mappings } = indexConfigurations[alias];
          const indexName = `${alias}-${Date.now()}`;
          
          // Check if the alias already exists
          const aliasExists = await this.client.indices.existsAlias({ name: alias });
          
          if (!aliasExists.body) {
            // Create the index with dynamic name
            await this.createIndex(indexName, settings, mappings);

            // Update the alias to point to the new index
            await this.updateAlias(alias, indexName);

            console.log(`Index ${indexName} created and mapped to alias ${alias}`);
          } else {
            console.log(`Alias ${alias} already exists, skipping creation.`);
          }
        }
      }
    } catch (error) {
      console.error('Error creating indices with aliases:', error);
      throw error;
    }
  }
}

module.exports = OpenSearchManager;
