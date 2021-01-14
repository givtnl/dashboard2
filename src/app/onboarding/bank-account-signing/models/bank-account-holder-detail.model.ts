import { PaymentProvider } from "./payment-provider.enum";

export interface BankAccountHolderDetailModel {
  Id: string;
  AccountId: number;
  FirstName: string;
  LastName: string;
  EmailAddress: number;
  SortCode: string;
  DetailLineOne: string;
  AccountName: string;
  OrganisationId: string;
  OrganisationName: string;
  OrganisationAddressLine1: string;
  OrganisationAddressLine2: string;
  OrganisationAddressLine3: string;
  OrganisationAddressLine4: string;
  OrganisationAddressLine5: string;
  OrganisationZipCode: string;
  InvitationExpiredDateTime: Date;
  InvitationIsExpired: boolean;
  PaymentProvider: PaymentProvider;
}
