import { CharityAddress } from './onboarding-organisation-details-charity-address';
import { CharityTrustee } from './onboarding-organisation-details-charity-trustee';

export interface GetCharityDetailsFromCommisionResponseModel {
    CharityName: string;
    Address: CharityAddress;
    PhoneNumber: string;
}
