import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { AddCharityDetailsToOrganisationCommand } from '../models/commands/add-charity-details-to-organisation.command';
import { Injectable } from '@angular/core';
import { OrganisationDetailModel } from 'src/app/organisations/models/organisation-detail.model';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsService {
  constructor(private backendService: BackendService) { }
  get(charityNumber: number): Observable<OrganisationDetailModel> {
    return this.backendService.get<OrganisationDetailModel>(`v2/charities/${charityNumber}`);
  }
  put(organisationId: string, command: AddCharityDetailsToOrganisationCommand) {
    return this.backendService.put(`v2/organisations/${organisationId}`, command)
  }
}
