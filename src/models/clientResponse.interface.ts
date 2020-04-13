export default interface ClientResponse {
  status: boolean;
  code: number;
  data?: any;
  error?: any;
}
