import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class OnboardingBankAccountService {
    constructor(private backendService: BackendService) {}

    create(command: AddBankAccountToOrganisationCommand): Observable<object>{
        return this.backendService.post(`organisations/${this.backendService.currentUser.organisationId}/accounts`, command);
    }
}