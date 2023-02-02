import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CharityCommisionOrganisationDetailModel } from '../models/charity-commision-organisation-detail.model';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TermsOfService } from "../models/wepay-terms-of-service.model";

@Injectable({
  providedIn: "root",
})
export class OnboardingOrganisationDetailsService {
  constructor(
    private http: HttpClient,
    private backendService: BackendService
  ) {}
  get(
    charityNumber: string
  ): Observable<CharityCommisionOrganisationDetailModel> {
    return this.backendService.get<CharityCommisionOrganisationDetailModel>(
      `v2/charities/${charityNumber}`
    );
  }

  saveWePayKYCDetails(kycToken: string, organisationId: any): Observable<any> {
    const obj = {
      kycToken,
    };
    return this.http.post<any>(
      `${environment.wePayApi}/organizations/${organisationId}/kyc-details`,
      obj
    );
  }

  acceptWePayTermsAndConditions(
    organisationId: string,
    termsOfServiceObj: TermsOfService
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.wePayApi}/organizations/${organisationId}/terms-of-service`,
      termsOfServiceObj
    );
  }

  saveWePayPayoutMethod(
    wePayPayoutMethodId: string,
    organisationId: any
  ): Observable<any> {
    const obj = {
      wePayPayoutMethodId,
    };
    return this.http.post<any>(
      `${environment.wePayApi}/organizations/${organisationId}/payout-method`,
      obj
    );
  }
}
