import { RequestInit } from 'node-fetch';
import BaseClient from './BaseClient';
import ClientResponse from '../models/clientResponse.interface';
import { Vendor, ClientUrls } from '../constants';

export default class GiantColdStorageClient extends BaseClient {
  private readonly giantBaseUrl = ClientUrls.Giant;
  private readonly coldStorageBaseUrl = ClientUrls.ColdStorage;

  async getSlot(postalCode: string, vendor: string): Promise<ClientResponse> {
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
