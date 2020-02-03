export interface CreateGiftAidSettingsCommand {
  charityCommissionReference: string;
  charityId: string;
  charityName: string;
  charityEmailAddress?: string | null;
  charityPhoneNumber: string;
  charityAddressLineOne: string;
  charityAddressLineTwo: string;
  charityAddressLineThree:string;
  charityAddressLineFour?:string|null;
  charityAddressZipCode: string;
  charityAddressCountry: string;
  authorisedOfficialFirstName:string;
  authorisedOfficialMiddleName?:string | null;
  authorisedOfficialLastName: string;
  authorisedOfficialPhoneNumber:string;
  authorisedOfficialHomeAddressLineOne:string;
  authorisedOfficialHomeAddressLineTwo:string;
  authorisedOfficialHomeAddressLineThree:string;
  authorisedOfficialHomeAddressLineFour:string;
  authorisedOfficialHomeAddressLineZipCode:string;
  authorisedOfficialHomeAddressLineCountry:string;
  nationalInsuranceNumber?:string | null;
  nationalIdentityCardNumber?:string | null;
}
