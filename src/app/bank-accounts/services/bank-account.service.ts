import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { BankAccountListModel } from '../models/bank-account-list.model';

@Injectable({
    providedIn:'root'
})
export class BankAccountService {
    constructor(private backendService: BackendService) {}

    getAccounts(organisationId: string): Observable<BankAccountListModel[]>{
        return this.backendService.get<BankAccountListModel[]>(`v2/organisations/${organisationId}/accounts`);
    }

}