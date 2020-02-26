import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchErrorStatus } from 'src/app/shared/extensions/observable-extensions';
import { GenericErrorResponseModel } from '../models/generic-error-response.model';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { take, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidationErrorInterceptor implements HttpInterceptor {
  /**
   *
   */
  constructor(private toastr: ToastrService, private translationService: TranslateService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchErrorStatus(422, error => this.showWarning(error)));
  }

  showWarning(error: HttpErrorResponse) {
    const errors = error.error as GenericErrorResponseModel;
    if (!errors) {
      return throwError(error);
    }
    if (errors && errors.AdditionalInformation && errors.AdditionalInformation.errorTerm){
      return;
    } 


    const errorProperties = Object.values(errors.AdditionalInformation).join(',');

    this.translationService.get('errorMessages.field-validation-errors').subscribe(result => this.toastr.warning(errorProperties, result));
  }
}
