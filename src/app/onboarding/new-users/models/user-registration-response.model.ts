export interface UserRegistrationResponseModel {
    Email:string;
    Status: number;
    StatusDescription:string;
    RequiredInputs: Array<string>;
    OrganisationId: string;
}