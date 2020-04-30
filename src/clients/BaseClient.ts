import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import ClientResponse from '../models/clientResponse.interface';

class BaseClient {
  private getConfig(): AxiosRequestConfig {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  protected processResponse(response: AxiosResponse): ClientResponse {
    return {
      status: true,
      code: response.status,
      data: response.data,
    };
  }

  protected processError(response: AxiosResponse): ClientResponse {
    console.error('BaseClient_processError', response);
    return {
      status: false,
      code: response.status,
      error: 'something went wrong',
    };
  }

  protected async get(url: string): Promise<ClientResponse> {
    try {
      const response = await axios.get(url);
      return this.processResponse(response);
    } catch (error) {
      return this.processError(error);
    }
  }

  protected async post(url: string, body?: any): Promise<ClientResponse> {
    try {
      const response = await axios.post(url, body, this.getConfig());
      return this.processResponse(response);
    } catch (error) {
      return this.processError(error);
    }
  }
}

export default BaseClient;
