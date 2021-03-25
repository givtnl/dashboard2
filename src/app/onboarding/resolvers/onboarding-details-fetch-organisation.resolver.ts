import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
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
