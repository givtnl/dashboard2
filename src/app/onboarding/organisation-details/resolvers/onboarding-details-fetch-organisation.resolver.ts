import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { BankAccountService } from 'src/app/bank-accounts/services/bank-account.service';
import { BankAccountListModel } from 'src/app/bank-accounts/models/bank-account-list.model';
import { BankAccountActiveStatusFilter, BankAccountPrimaryStatusFilter, BankAccountVerificationStatusFilter } from 'src/app/bank-accounts/models/bank-account-filter.model';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { OnboardingOrganisationDetailsService } from '../services/onboarding-organisation-details.service';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingDetailsFetchOrganisationResolver implements Resolve<OrganisationDetailModel> {
  /**
   *
   */
  constructor(private service: OrganisationsService, private applicationStateService: ApplicationStateService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): OrganisationDetailModel | Observable<OrganisationDetailModel> | Promise<OrganisationDetailModel> {
      var currentOrganisation = this.applicationStateService.currentTokenModel.OrganisationAdmin
    return this.service.getById(currentOrganisation)
  }
}
