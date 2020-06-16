import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ApplicationStateService } from '../services/application-state.service';
import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { ErrorMessages } from '../enums/error-messages.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TempUserGuard implements CanActivate {
  constructor(private applicationStateService: ApplicationStateService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    var userExt = this.applicationStateService.currentUserExtensionModel;

    var tempUser = (isNullOrUndefined(userExt.IBAN) || userExt.IBAN == environment.tempIban)
      && isNullOrUndefined(userExt.SortCode)
      && isNullOrUndefined(userExt.AccountNumber);

    if (tempUser) {
      return throwError({
        error_status: ErrorMessages.TempUser
      });
    }

    return of(true);
  }
}