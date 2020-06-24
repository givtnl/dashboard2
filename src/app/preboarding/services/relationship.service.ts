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
        httpParameters.append("hasRelationShipRules", "true"); //=> this has to be a string because it is a query parameter...
        // return this.backendService.get(`v2/organisations`, httpParameters);

        let org: OrganisationWithRulesDetail[] = [{
            Id: "1",
            Name: "prov org",
            RelationshipRules: [
                {
                    Optional: false,
                    RelationshipType: RelationshipType.UseBankAccount
                },
                {
                    Optional: true,
                    RelationshipType: RelationshipType.UseGiftAidSettings
                }
            ]
        }];

        return of(org);
    }
}