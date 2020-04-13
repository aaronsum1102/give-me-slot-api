import BaseClient from "./BaseClient";
import ClientResponse from "../models/clientResponse.interface";

interface ShengSiongRequestBody {
  pinStatus: string;
  code: string;
}

interface ShengSiongResponse extends ClientResponse {
  data?: {
    result: string;
    response: string;
  };
}

class ShengSiongClient extends BaseClient {
  private readonly baseUrl = "https://www.allforyou.sg/Common";

  async getSlot(postalCode: string): Promise<ShengSiongResponse> {
    const url = `${this.baseUrl}/pinCodeSearch`;
    return await this.post(url, {
      pinStatus: "1",
      code: postalCode,
    });
  }
}

export { ShengSiongClient, ShengSiongResponse };
