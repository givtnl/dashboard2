import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BankAccountSignInvitationIdRequiredGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (!next.queryParams.invitationId || !next.queryParams.organisationId || !next.queryParams.accountId) {
      return this.HandleFailure(next);
    }
    return true;
  }

  private HandleFailure(next: ActivatedRouteSnapshot): boolean {
    this.router.navigate(['/system/error-page'], {
      queryParams: next.queryParams
    });

    return false;
  }
}
