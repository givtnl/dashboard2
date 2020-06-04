import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ApplicationStateService } from '../services/application-state.service';
import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class TempUserGuard implements CanActivate {
    constructor(private router: Router, private applicationStateService: ApplicationStateService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        var tempUser = isNullOrUndefined(this.applicationStateService.currentUserExtensionModel.IBAN)
            && isNullOrUndefined(this.applicationStateService.currentUserExtensionModel.SortCode) 
            && isNullOrUndefined(this.applicationStateService.currentUserExtensionModel.AccountNumber);

        if (tempUser) {
            this.HandleFailure(next, 'errorMessages.tempUser')
        } else 
            return true;
    }
    private HandleFailure(next: ActivatedRouteSnapshot, errorTerm: string = null): boolean {
        this.router.navigate(['system','root', { outlets: { 'system-outlet': ['error'] }} ], {
          queryParams: {
            error: errorTerm
          }
        });
        return false;
      }
}