import { Injectable } from '@angular/core';
import { OrganisationWithRulesDetail } from 'src/app/onboarding/organisation-details/models/organisation-with-rules-detail.model';
import { Observable, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { RelationshipType } from 'src/app/organisations/enums/relationship-type.model';

@Injectable({
    providedIn: 'root'
})
export class RelationShipService {

    constructor(private backendService: BackendService) { }

    getAllRelationShipProvidingOrganisations(): Observable<OrganisationWithRulesDetail[]> {
        let httpParameters = new HttpParams();
        httpParameters = httpParameters.append("hasRelationshipRules", "true"); 
        return this.backendService.get<OrganisationWithRulesDetail[]>(`organisation`, httpParameters);
    }
}