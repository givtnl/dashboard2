import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingDetailsFetchParentResolver implements Resolve<boolean> {
  /**
   *
   */
  constructor(private service: OnboardingOrganisationDetailsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
 return this.service.checkIfParentExists(null,null)
 .pipe(catchError(() => of(false)))
 .pipe(map(result => true));

  
  }
}
