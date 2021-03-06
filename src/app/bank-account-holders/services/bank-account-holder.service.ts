import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { BankAccountHolderListModel } from '../models/bank-account-holder-list.model';
import { UpdateBankAccountHolderCommand } from '../models/commands/update-bank-account-holder.command';

@Injectable({
    providedIn: 'root'
})
export class BankAccountHolderService {
    constructor(private backendService: BackendService) { }

    getByAccount(organisationId: string, accountId: number): Observable<BankAccountHolderListModel[]> {
        return this.backendService.get<BankAccountHolderListModel[]>(`v2/organisations/${organisationId}/accounts/${accountId}/holders`);
    }

    update(organisationId: string, command: UpdateBankAccountHolderCommand): Observable<object> {
        return this.backendService.put(`v2/organisations/${organisationId}/accounts/${command.accountId}/holders/${command.id}`, command);
    }
}
