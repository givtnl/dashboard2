import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { GetCharityDetailsFromCommisionResponseModel } from '../models/GetCharityDetailsFromCommisionResponseModel';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn:'root'
})
export class OnboardingOrganisationDetailsService {
  constructor(private backendService: BackendService) { }
  get(charityNumber: Number): Observable<GetCharityDetailsFromCommisionResponseModel> {
    return this.backendService.get<GetCharityDetailsFromCommisionResponseModel>(`v2/charities/${charityNumber}`);
  }
}
