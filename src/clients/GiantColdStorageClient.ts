import BaseClient from './BaseClient';
import ClientResponse from '../models/clientResponse.interface';
import { Vendor } from '../enum/Vendor';
import axios from 'axios';
import querystring from 'querystring';

export default class GiantColdStorageClient extends BaseClient {
  private readonly giantBaseUrl = 'https://giant.sg/checkout/cart/checkdelivery';
  private readonly coldStorageBaseUrl = 'https://coldstorage.com.sg/checkout/cart/checkdelivery';

  protected async post(url: string, body?: any): Promise<ClientResponse> {
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    try {
      const response = await axios.post(url, body, config);
      return this.processResponse(response);
    } catch (error) {
      return this.processError(error);
    }
  }

  async getSlot(postalCode: string, vendor: Vendor): Promise<ClientResponse> {
    let url = '';
    switch (vendor) {
      case Vendor.ColdStorage:
        url = this.coldStorageBaseUrl;
        break;
      case Vendor.Giant:
        url = this.giantBaseUrl;
        break;
    }
    const payload = {
      postal_code: postalCode
    };
    return await this.post(url, querystring.stringify(payload));
  }
}
