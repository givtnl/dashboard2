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
}
