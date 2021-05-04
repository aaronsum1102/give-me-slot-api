import fetch, { Response, RequestInfo, RequestInit } from 'node-fetch';
import ClientResponse from '../models/clientResponse.interface';

class BaseClient {
  private getConfig(): RequestInit {
    return {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  }

  protected async processResponse(response: Response): Promise<ClientResponse> {
    const data = await response.json();
    return {
      status: true,
      code: response.status,
      data: data
    };
  }

  protected processError(response: Response): ClientResponse {
    return {
      status: false,
      code: response.status,
      error: 'something went wrong'
    };
  }

  protected async get(url: RequestInfo): Promise<ClientResponse> {
    try {
      const response = await fetch(url);
      return this.processResponse(response);
    } catch (error) {
      return this.processError(error);
    }
  }

  protected async post(url: RequestInfo, init?: RequestInit): Promise<ClientResponse> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        ...this.getConfig(),
        ...init
      });
      return this.processResponse(response);
    } catch (error) {
      return this.processError(error);
    }
  }
}

export default BaseClient;
