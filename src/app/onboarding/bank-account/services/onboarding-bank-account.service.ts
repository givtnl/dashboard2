import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { OnboardingBankAccountRegistrationResponseModel } from '../models/onboarding-bank-account-registration-response.model';

@Injectable({
    providedIn:'root'
})
export class OnboardingBankAccountService {
    constructor(private backendService: BackendService) {}

    getRegistrationStatus(organisationId: string): Observable<OnboardingBankAccountRegistrationResponseModel> {
        return this.backendService.get(`v2/organisations/${organisationId}/registration/account`);
    }

    create(command: AddBankAccountToOrganisationCommand): Observable<object>{
        return this.backendService.post(`organisations/${command.organisationId}/accounts`, command);
    }
}