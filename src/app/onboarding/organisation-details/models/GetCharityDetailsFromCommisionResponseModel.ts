import { Address } from './Address';
import { Trustee } from './Trustee';

export interface GetCharityDetailsFromCommisionResponseModel {
    CharityNumber: number;
    CharityName: string;
    Address: Address;
    PhoneNumber: string;
    Email: string;
    Trustees: Trustee[];
    IsSuspended: boolean;
}
