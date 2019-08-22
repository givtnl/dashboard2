export interface UserRegistrationResponse {
    email:string;
    status: number;
    statusDescription:string;
    requiredInputs: Array<string>;
}