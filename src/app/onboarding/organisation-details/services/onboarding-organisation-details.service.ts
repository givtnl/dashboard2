import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CharityCommisionOrganisationDetailModel } from '../models/charity-commision-organisation-detail.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OnboardingOrganisationDetailsService {
  constructor(private backendService: BackendService) {}
  get(charityNumber: string): Observable<CharityCommisionOrganisationDetailModel> {
    return this.backendService.get<CharityCommisionOrganisationDetailModel>(`v2/charities/${charityNumber}`);
  }

  saveWePayKYCDetails(kycToken:string,organisationId: any): Observable<any> {
    const obj = {
      kycToken,
    }
    return this.backendService.post<any>(`v3/organisations/${organisationId}/onboarding/wepay/kyc-details`, obj);
  }

  acceptWePayTermsAndConditions(termsAndConditionsObj:any): Observable<any> {
    const header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.backendService.patch<any>(`v3/organisations/${termsAndConditionsObj.organisationId}/onboarding/wepay/tos-and-pp`,termsAndConditionsObj,header);
  }

  saveWePayPayoutMethod(organisationId:string,obj: any): Observable<any> {
    return this.backendService.post<any>(`v3/organisations/${organisationId}/onboarding/wepay/payout-method`, obj);
  }
}
