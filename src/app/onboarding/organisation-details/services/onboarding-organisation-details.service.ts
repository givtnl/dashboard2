import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { GetCharityDetailsFromCommisionResponseModel } from '../models/onboarding-organisation-details-charity-response-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsService {
  constructor(private backendService: BackendService) { }
  get(charityNumber: number): Observable<GetCharityDetailsFromCommisionResponseModel> {
    return this.backendService.get<GetCharityDetailsFromCommisionResponseModel>(`v2/charities/${charityNumber}`);
  }
  post(charityNumber: number, charityDetails: GetCharityDetailsFromCommisionResponseModel) {
    //todo: add body to post
    return this.backendService.get<GetCharityDetailsFromCommisionResponseModel>(`v2/charities/${charityNumber}`)
  }
}
