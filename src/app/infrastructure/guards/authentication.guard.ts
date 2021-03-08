import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ApplicationStateService } from '../services/application-state.service';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class AuthenticationGuard implements CanActivate {
    constructor(private router: Router, private applicationStateService: ApplicationStateService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        var authenticated = this.applicationStateService.currentTokenModel !== null && this.applicationStateService.currentTokenModel !== undefined
            && !this.applicationStateService.currentUserModel !== null && this.applicationStateService.currentUserModel !== undefined;

        if (!authenticated) {
            console.error('Failed to satisfy the authentication guard');
            this.router.navigate(['/', 'account', 'login']);
            return false;
        } else return true;
    }
}