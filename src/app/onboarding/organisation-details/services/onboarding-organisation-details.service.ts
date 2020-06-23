import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CharityCommisionOrganisationDetailModel } from '../models/charity-commision-organisation-detail.model';
import { UpdateOrganisationDetailsCommand } from '../models/commands/update-organisation-details.command';
import { AddChildOrganisationToParentOrganisationCommand } from '../models/commands/add-childorganisation-to-parentorganisation.command';

@Injectable({
    providedIn: 'root'
})
export class OnboardingOrganisationDetailsService {
    constructor(private backendService: BackendService) { }
    get(charityNumber: number): Observable<CharityCommisionOrganisationDetailModel> {
        return this.backendService.get<CharityCommisionOrganisationDetailModel>(`v2/charities/${charityNumber}`);
    }

    addChildToParentOrgansiation(organisationId: string, command: AddChildOrganisationToParentOrganisationCommand) {
        return this.backendService.post(`v2/organisations/${organisationId}/suborganisations`, command)
    }

    put(organisationId: string, command: UpdateOrganisationDetailsCommand) {
        return this.backendService.put(`v2/organisations/${organisationId}`, command);
    }
}
