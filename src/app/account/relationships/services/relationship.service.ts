import { Injectable } from '@angular/core';
import { OrganisationWithRulesDetail } from 'src/app/onboarding/organisation-details/models/organisation-with-rules-detail.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { CreateRelationshipCommand } from '../models/commands/create-relation-ship.command';
import { RelationshipListModel } from '../models/relation-ship-list.model';


@Injectable({
    providedIn: 'root'
})
export class RelationShipService {

    constructor(private backendService: BackendService) { }

    get(usingOrganisationId: string): Observable<RelationshipListModel[]> {
        return this.backendService.get<RelationshipListModel[]>(`v2/organisations/${usingOrganisationId}/relationships`);
    }

    notify(usingOrganisationId: string, providingOrganisationId: string) {
        return this.backendService.patch(`v2/organisations/${usingOrganisationId}/relationships/${providingOrganisationId}/notify`);
    }

    getAllRelationShipProvidingOrganisations(): Observable<OrganisationWithRulesDetail[]> {
        let httpParameters = new HttpParams();
        httpParameters = httpParameters.append("hasRelationshipRules", "true");
        return this.backendService.get<OrganisationWithRulesDetail[]>(`organisation`, httpParameters);
    }

    create(createRelationshipCommand: CreateRelationshipCommand): Observable<object> {
        return this.backendService.post<object>(`v2/organisations/${createRelationshipCommand.usingOrganisationId}/relationships`, createRelationshipCommand);
    }
}