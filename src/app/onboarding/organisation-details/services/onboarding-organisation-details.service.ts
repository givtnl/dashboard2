import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CharityCommisionOrganisationDetailModel } from '../models/charity-commision-organisation-detail.model';
import { HttpParams } from '@angular/common/http';
import { AddChildOrganisationToParentOrganisationCommand } from '../models/commands/add-childorganisation-to-parentorganisation.command';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';

@Injectable({
    providedIn: 'root'
})
export class OnboardingOrganisationDetailsService {
  constructor(private backendService: BackendService) {}
  get(charityNumber: number): Observable<CharityCommisionOrganisationDetailModel> {
    return this.backendService.get<CharityCommisionOrganisationDetailModel>(`v2/charities/${charityNumber}`);
  }

  checkIfParentExists(charityNumber: string, currentOrganisationId: string) : Observable<OrganisationDetailModel> {
    let httpParameters = new HttpParams();
    if (currentOrganisationId && currentOrganisationId.length > 0){
      httpParameters = httpParameters.append('toExcludeOrganisationId', currentOrganisationId);
    }
    return this.backendService.get<OrganisationDetailModel>(`v2/organisations/${charityNumber}`, httpParameters);
  }

  addChildToParentOrgansiation(organisationId: string, command: AddChildOrganisationToParentOrganisationCommand){
    return this.backendService.post(`v2/organisations/${organisationId}/suborganisations`, command)
  }
}
