import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { OnboardingBankAccountRegistrationResponseModel } from '../models/onboarding-bank-account-registration-response.model';
import { CreatedResponseModel } from 'src/app/infrastructure/models/response.model';
import { AddBankAccountToOrganisationCommand } from '../models/add-bank-account-to-organisation.command';

@Injectable({
    providedIn:'root'
})
export class OnboardingBankAccountService {
    constructor(private backendService: BackendService) {}

    getRegistrationStatus(organisationId: string): Observable<OnboardingBankAccountRegistrationResponseModel> {
        return this.backendService.get(`v2/organisations/${organisationId}/registration/account`);
    }

    create(organisationId: string, command: AddBankAccountToOrganisationCommand): Observable<CreatedResponseModel<number>>{
        return this.backendService.post<CreatedResponseModel<number>>(`v2/organisations/${organisationId}/accounts`, command);
    }
}