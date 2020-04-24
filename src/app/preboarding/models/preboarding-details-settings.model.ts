import { organisationDeliveryAddress } from './preboarding-organisationDeliveryAddress.model';

export interface organisationSettings{
    organisationName: string;
    aantalCollecteMiddelen: number;
    aantalMensenInKerk: number;
    email: string;
    address: organisationDeliveryAddress;
}