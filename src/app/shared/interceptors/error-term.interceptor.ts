import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { TranslatableToastrService } from '../services/translate-able-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorTermInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toaster: TranslatableToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((result) => {
      this.showErrorTermIfAny(result);
      return throwError(result);
    }));
  }
  async showErrorTermIfAny(result: any): Promise<any> {
    console.log(result);
    if (result && result.error && result.error.AdditionalInformation && result.error.AdditionalInformation.errorTerm) {
      await this.toaster.error(result.error.AdditionalInformation.errorTerm, "errorMessages.validation-errors")
    }
  }
}
