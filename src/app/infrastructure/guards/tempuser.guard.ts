import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ApplicationStateService } from '../services/application-state.service';
import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { ErrorMessages } from '../enums/error-messages.enum';

@Injectable({
  providedIn: 'root'
})
export class TempUserGuard implements CanActivate {
  constructor(private applicationStateService: ApplicationStateService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    var userExt = this.applicationStateService.currentUserExtensionModel;

    if (userExt?.IBAN == "FB66GIVT12345678") {
      return throwError({
        error_status: ErrorMessages.TempUser
      });
    }

    return of(true);
  }
}