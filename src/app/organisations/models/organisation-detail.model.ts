import { OrganisationRegulator } from './organisation-regulator.model';

export interface OrganisationDetailModel {
  Guid: string;
  CrmId: number;
  Name: string;
  TaxDeductable: boolean;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressLine4: string;
  AddressLine5: string;
  PostalCode: string;
  Country: string;
  TelNr: string;
  Number: string;
  Iban: string;
  Email: string;
  SortCode: string;
  AccountNumber: string;
  PaymentProviderIdentification: string;
  AccountHolderFirstName: string;
  AccountHolderLastName: string;
  GiftAidEnabled?: boolean | null;
  Regulator: OrganisationRegulator;
  CharityCommissionReference: string;
  OrganisationType: number;
  CharityId: string;
  ReferenceWithParent?: string | null;
}