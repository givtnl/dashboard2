import { Injectable } from '@angular/core';
import { PreparedGiftAidSettings } from '../models/prepared-giftaid-settings.model';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import '../../../shared/extensions/general-extensions';
import { GeneralExtensions } from '../../../shared/extensions/general-extensions';
@Injectable({
  providedIn: 'root'
})
export class OnboardingGiftAidService {
  constructor(private backendService: BackendService) {}

  getPreparedSettings(organisationId: string): Observable<PreparedGiftAidSettings> {
    return this.backendService
      .get(`v2/organisations/${organisationId}/giftaidsettings/prepare`)
      .pipe(map(result => GeneralExtensions.keysToCamelCase(result)));
  }

  // create(organisationId: string, command: AddBankAccountToOrganisationCommand): Observable<CreatedResponseModel<number>>{
  //     return this.backendService.post<CreatedResponseModel<number>>(`v2/organisations/${organisationId}/accounts`, command);
  // }
}
