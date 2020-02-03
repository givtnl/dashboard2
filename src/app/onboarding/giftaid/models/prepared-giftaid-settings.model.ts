export interface PreparedGiftAidSettings{
    charityCommissionReference: string;
    charityName: string;
    charityId: string;
    charityAddressZipCode: string;
    charityAddressCountry: string;
    charityAddressLineOne:string;
    charityAddressLineTwo:string;
    charityAddressLineThree: string;
    charityPhoneNumber:string;
    charityEmailAddress?:string | null;
}