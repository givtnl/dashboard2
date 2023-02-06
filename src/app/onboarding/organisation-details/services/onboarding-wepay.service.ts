import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { TermsOfService } from "../models/wepay-terms-of-service.model";

@Injectable({
  providedIn: "root",
})
export class OnboardingWePayService {
  constructor(private http: HttpClient) {}

  completePreboarding(organisationId: string) {
    return this.http.post<any>(
      `${environment.wePayApi}/organizations/${organisationId}/preboard`,
      {}
    );
  }

  acceptTermsAndPricing(organisationId: string) {
    return this.http.post(
      `${environment.wePayApi}/organizations/${organisationId}/accept`,
      {
        accepted: true,
      }
    );
  }

  saveWePayKYCDetails(
    kycToken: string,
    organisationId: string
  ): Observable<any> {
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
    payoutMethodToken: string,
    organisationId: any
  ): Observable<any> {
    const obj = {
      payoutMethodToken,
    };
    return this.http.post<any>(
      `${environment.wePayApi}/organizations/${organisationId}/payout-method`,
      obj
    );
  }
}
