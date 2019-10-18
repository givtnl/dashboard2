import { CharityAddress } from './onboarding-organisation-details-charity-address';
import { CharityTrustee } from './onboarding-organisation-details-charity-trustee';

export interface GetCharityDetailsFromCommisionResponseModel {
    CharityNumber: number;
    CharityName: string;
    Address: CharityAddress;
    PhoneNumber: string;
    Email: string;
    Trustees: CharityTrustee[];
    IsSuspended: boolean;
}
