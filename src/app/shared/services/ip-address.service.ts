import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import {
  HttpBackend,
  HttpClient,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class IPAdressService {
  private httpClient: HttpClient;

  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  public getMyIpAddress(): Observable<string> {
    return this.httpClient.get<string>('https://jsonip.com').pipe(
        catchError(this.error)
    );
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
