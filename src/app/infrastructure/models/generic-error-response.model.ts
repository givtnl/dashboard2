export interface GenericErrorResponseModel {
  ErrorCode: number;
  AdditionalInformation: { [key: string]: object };
  Message: string;
}
