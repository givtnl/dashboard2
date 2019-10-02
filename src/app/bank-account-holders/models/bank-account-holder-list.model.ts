import { BankAccountholderRegistrationStatus } from './bank-account-holder-registration-status.model';

export interface BankAccountHolderListModel {
  Id: string;
  FirstName: string;
  LastName: string;
  InvitationUserId: string;
  InvitationDate: Date;
  InvitationExpirationDate: Date;
  Accepted: boolean | null;
  Status: BankAccountholderRegistrationStatus;
  StatusDescription: string;
  EmailAddress: string;
}
