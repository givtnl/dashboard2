import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnboardingGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = next.queryParams.token as string;
    const companyName = next.queryParams.cgname as string;

    if (!token || !companyName) {
      console.error('Failed to satisfy the onboarding guard');
      this.router.navigate(['/', 'system', 'not-found']);
      return false;
    } else return true;
  }
}
