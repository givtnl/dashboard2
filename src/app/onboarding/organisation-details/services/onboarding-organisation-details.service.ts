import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { GetCharityDetailsFromCommisionResponseModel } from '../models/onboarding-organisation-details-charity-response-model';
import { AddCharityDetailsToOrganisationCommand } from '../models/commands/add-charity-details-to-organisation.command';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OnboardingOrganisationDetailsService {
  constructor(private backendService: BackendService) { }
  get(charityNumber: number): Observable<GetCharityDetailsFromCommisionResponseModel> {
    return this.backendService.get<GetCharityDetailsFromCommisionResponseModel>(`v2/charities/${charityNumber}`);
  }
  put(organisationId: string, command: AddCharityDetailsToOrganisationCommand) {
    return this.backendService.put(`v2/organisations/${organisationId}`, command)
  }
}
