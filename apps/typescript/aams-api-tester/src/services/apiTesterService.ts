import axios, { Method } from 'axios';
import client from '../config/elasticsearchConfig';
import { TestResult, AddEndpointRequest } from '../models/testResult';

export class ApiTesterService {
  async testEndpoint(endpoint: AddEndpointRequest): Promise<TestResult> {
    const startTime = Date.now();
    const response = await axios.request({
      url: endpoint.url,
      method: endpoint.method as Method,
      headers: endpoint.headers,
      data: endpoint.body,
    });

    const responseTime = Date.now() - startTime;

    const result: TestResult = {
      endpoint: endpoint.url,
      statusCode: response.status,
      responseTime,
      responseBody: response.data,
      timestamp: new Date(),
    };

    await client.index({
      index: 'api-test-results',
      body: result,
    });

    return result;
  }

  async getResults() {
    const searchResponse = await client.search({
      index: 'api-test-results',
      body: {
        query: {
          match_all: {},
        },
      },
    });

    return searchResponse.hits.hits.map((hit: any) => hit._source);
  }
}
