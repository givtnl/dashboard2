import { OrganisationRegulator } from 'src/app/organisations/models/organisation-regulator.model';

export interface PreparedGiftAidSettings{
    charityCommissionReference: string;
    charityName: string;
    charityId: string;
    regulator: OrganisationRegulator;
    charityAddressZipCode: string;
    charityAddressCountry: string;
    charityAddressLineOne:string;
    charityAddressLineTwo:string;
    charityAddressLineThree: string;
    charityAddressLineFour?:string;
    charityPhoneNumber:string;
    charityEmailAddress?:string | null;
    nationalInsuranceNumber?:string | null;
    authorisedOfficialFirstName?:string | null;
    authorisedOfficialMiddleName?:string | null;
    authorisedOfficialLastName?:string |null;
    nationalIdentityCardNumber?:string |null;
    authorisedOfficialPhoneNumber?:string |null;
    authorisedOfficialHomeAddressLineOne?:string |null;
    authorisedOfficialHomeAddressLineTwo?:string |null;
    authorisedOfficialHomeAddressLineThree?:string | null;
    authorisedOfficialHomeAddressLineFour?:string | null;
    authorisedOfficialHomeAddressZipCode?:string |null;
    authorisedOfficialHomeAddressCountry?:string | null;
}