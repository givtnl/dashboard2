import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { LegalEntity } from "../../onboarding/organisation-details/models/wepay-legal-entities.model";
import { Account } from "../../onboarding/organisation-details/models/wepay-accounts.model";
import { PayoutMethod } from "src/app/onboarding/organisation-details/models/wepay-payout-method.model";

@Injectable({
  providedIn: "root",
})
export class WePayService {
  private httpClient: HttpClient;

  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  createLegalEntityWithTokenID(tokenID: string): Observable<LegalEntity> {
    let data = {
      country: "US",
      token: {
        id: tokenID,
      },
    };
    let headers = this.createHeaders();
    let API_URL = `${environment.wePayApi}/legal_entities`;
    return this.httpClient
      .post<LegalEntity>(API_URL, JSON.stringify(data), { headers })
      .pipe(catchError(this.error));
  }

  getWePayLegalEntityById(id:string): Observable<LegalEntity> {
    let headers = this.createHeaders();
    let API_URL = `${environment.wePayApi}/legal_entities/${id}`;
    return this.httpClient.get<LegalEntity>(API_URL, { headers }).pipe(catchError(this.error));
  }

  updateLegalEntityProperties(legalEntityId: string,legalEntityProperties: any): Observable<LegalEntity> {
    let headers = this.createHeaders();
    let API_URL = `${environment.wePayApi}/legal_entities/${legalEntityId}`;
    return this.httpClient
      .post<LegalEntity>(API_URL, JSON.stringify(legalEntityProperties), { headers })
      .pipe(catchError(this.error));
  }

  createAccount(accountObj: Account): Observable<Account> {
    let headers = this.createHeaders();
    let API_URL = `${environment.wePayApi}/accounts`;
    return this.httpClient
      .post<Account>(API_URL, JSON.stringify(accountObj), { headers })
      .pipe(catchError(this.error));
  }

  createPayoutMethod(payoutMethodObj: PayoutMethod): Observable<PayoutMethod> {
    let headers = this.createHeaders();
    let API_URL = `${environment.wePayApi}/payout_methods`;
    return this.httpClient
      .post<PayoutMethod>(API_URL, JSON.stringify(payoutMethodObj), { headers })
      .pipe(catchError(this.error));
  }

  createHeaders():HttpHeaders {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:4200",
      "Api-Version": "3.0",
      "App-Id": environment.wePayAppId,
      "App-Token": environment.wePayAppToken,
    });
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
