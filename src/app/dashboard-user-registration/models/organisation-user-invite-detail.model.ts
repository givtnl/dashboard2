import { OrganisationUserInviteStatus } from "./organisation-user-invite-status.enum";

export interface OrganisationUserInviteDetailModel {
  Id: string;
  CollectGroupId: string;
  OrganisationId: string;
  InvitationUserId: string;
  CreationDate: Date;
  Status: OrganisationUserInviteStatus;
  FirstName: string;
  LastName: string;
  Email: string;
}
