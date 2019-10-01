export interface BankAccountHolderListModel {
  Id: string;
  FirstName: string;
  LastName: string;
  InvitationUserId: string;
  InvitationDate: Date;
  InvitationExpirationDate: Date;
  Accepted: boolean | null;
  Status: number;
}
