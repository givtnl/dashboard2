export interface RegisterOnboardingModel {
    email:string;
    status: number;
    statusDescription:string;
    requiredInputs: Array<string>;
}