import { RequestInit } from 'node-fetch';
import BaseClient from './BaseClient';
import ClientResponse from '../models/clientResponse.interface';
import { Vendor } from '../enum/Vendor';

export default class GiantColdStorageClient extends BaseClient {
  private readonly giantBaseUrl = 'https://giant.sg/checkout/cart/checkdelivery';
  private readonly coldStorageBaseUrl = 'https://coldstorage.com.sg/checkout/cart/checkdelivery';

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
    const init: RequestInit = {
      body: `postal_code=${postalCode}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    return await this.post(url, init);
  }
}
