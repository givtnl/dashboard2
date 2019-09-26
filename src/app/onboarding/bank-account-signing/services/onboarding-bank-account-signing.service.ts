import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { BankAccountHolderDetailModel } from '../models/bank-account-holder-detail.model';


@Injectable({
    providedIn:'root'
})
export class OnboardingBankAccountSigningService {
    constructor(private backendService: BackendService) {}

    getToSignAccountHolder(organisationId: string, accountId: number, invitationId: string): Observable<BankAccountHolderDetailModel>{
        return this.backendService.get<BankAccountHolderDetailModel>(`v2/organisations/${organisationId}/accounts/${accountId}/holders/${invitationId}`);
    }

    reject(organisationId: string, accountId: number, invitationId: string):Observable<object>{
        return this.backendService.patch<object>(`v2/organisations/${organisationId}/accounts/${accountId}/holders/${invitationId}/reject`)
    }
   
}