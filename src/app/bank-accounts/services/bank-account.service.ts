import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { BankAccountListModel } from '../models/bank-account-list.model';
import { BankAccountFilterModel } from '../models/bank-account-filter.model';
import { HttpParams } from '@angular/common/http';
import { ExportBankAccountStatementCommand } from '../models/commands/export-bank-account-statement.command';

@Injectable({
    providedIn: 'root'
})
export class BankAccountService {
    constructor(private backendService: BackendService) { }

    getAccounts(organisationId: string, filterModel: BankAccountFilterModel = null): Observable<BankAccountListModel[]> {
        let searchParams = new HttpParams();
        if (filterModel) {
            searchParams = searchParams.append('activeStatus', filterModel.activeFilter.toString());
            searchParams = searchParams.append('primaryStatus', filterModel.primaryFilter.toString());
            searchParams = searchParams.append('verificationStatus', filterModel.verifiedFilter.toString());
        }
        return this.backendService.get<BankAccountListModel[]>(`v2/organisations/${organisationId}/accounts`, searchParams);
    }

    uploadStatement(organisationId: string, command: ExportBankAccountStatementCommand): Promise<any> {
        return this.backendService.post(`v2/organisations/${organisationId}/accounts/statement`, command).toPromise();
    }
}
