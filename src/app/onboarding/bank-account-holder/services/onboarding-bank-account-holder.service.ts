import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardingBankAccountHolderService {
  constructor(private backendService: BackendService) {}

  invite(organisationId: string, accountId: number, command: InviteBankAccountHolderToSignMandateCommand): Observable<object> {
    return this.backendService.post(`v2/organisations/${organisationId}/accounts/${accountId}/holders`, command);
  }
}
