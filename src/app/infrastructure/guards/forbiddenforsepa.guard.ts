import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ApplicationStateService } from '../services/application-state.service';
import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { ErrorMessages } from '../enums/error-messages.enum';
import { environment } from 'src/environments/environment';
import { CollectGroupsService } from 'src/app/collect-groups/services/collect-groups.service';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';

@Injectable({
  providedIn: 'root'
})
export class ForbiddenForSepaGuard implements CanActivate {
  constructor(private router: Router, private applicationStateService: ApplicationStateService, private organisationService: OrganisationsService) { }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    var bacsCountries = ["GB", "GG", "JE"];
    var returnValue = true;
    var currentToken = this.applicationStateService.currentTokenModel;

    var Organisation = await this.organisationService.getById(currentToken.OrganisationAdmin).toPromise();
    if (!bacsCountries.contains(Organisation.Country)) returnValue = false;

    if (!returnValue) {
      console.error('Failed to satisfy the authentication guard');
      this.router.navigate(['/', 'account', 'redirect']);
      return false;
    } else return true;
  }
}