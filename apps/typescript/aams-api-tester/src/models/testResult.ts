export interface TestResult {
    endpoint: string;
    statusCode: number;
    responseTime: number;
    responseBody: any;
    timestamp: Date;
  }
  
  export interface AddEndpointRequest {
    url: string;
    method: string;
    headers?: Record<string, string>;
    body?: any;
  }
  