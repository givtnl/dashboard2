import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { BankAccountListModel } from '../models/bank-account-list.model';
import { BankAccountFilterModel } from '../models/bank-account-filter.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {
  constructor(private backendService: BackendService) {}

  getAccounts(organisationId: string, filterModel: BankAccountFilterModel = null): Observable<BankAccountListModel[]> {
    let searchParams = new HttpParams();
    if (filterModel) {
      if (filterModel.activeFilter) {
        searchParams = searchParams.append('activeStatus', filterModel.activeFilter.toString());
      }
      if (filterModel.primaryFilter) {
        searchParams = searchParams.append('primaryStatus', filterModel.primaryFilter.toString());
      }
      if (filterModel.verifiedFilter) {
        searchParams = searchParams.append('verificationStatus', filterModel.verifiedFilter.toString());
      }
    }

    return this.backendService.get<BankAccountListModel[]>(`v2/organisations/${organisationId}/accounts`, searchParams);
  }
}
