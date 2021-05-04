import BaseClient from './BaseClient';
import ClientResponse from '../models/clientResponse.interface';

export default class NTUCClient extends BaseClient {
  private readonly baseUrl = 'https://website-api.omni.fairprice.com.sg/api';

  async getDeliveryStoreId(postalCode: string): Promise<string> {
    const url = `${this.baseUrl}/serviceable-area?city=Singapore&pincode=${postalCode}`;
    const response = await this.get(url);
    if (response?.data) {
      if (response.data?.data) {
        return response.data.data.zone.storeId;
      } else {
        throw new Error('Invalid postal code.');
      }
    } else if (response?.error) {
      throw new Error(response.error);
    }
  }

  async getSlots(postalCode: string, storeId: string): Promise<ClientResponse> {
    const url = `${this.baseUrl}/checkout`;
    const body = JSON.stringify({
      address: {
        pincode: postalCode
      },
      storeId: `${storeId}`,
      cart: {
        items: []
      }
    });
    const response = await this.post(url, { body });
    return response;
  }
}
