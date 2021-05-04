import BaseClient from './BaseClient';
import ClientResponse from '../models/clientResponse.interface';
import { ClientUrls } from '../constants';

interface ShengSiongResponse extends ClientResponse {
  data?: {
    result: any;
    response: string;
    succMessage?: string;
  };
}

class ShengSiongClient extends BaseClient {
  private readonly baseUrl = ClientUrls.ShengSiong;

  async getSlot(postalCode: string): Promise<ShengSiongResponse> {
    const url = `${this.baseUrl}/pinCodeSearch`;
    const body = JSON.stringify({
      pinStatus: '1',
      code: postalCode
    });
    return await this.post(url, { body });
  }
}

export { ShengSiongClient, ShengSiongResponse };
