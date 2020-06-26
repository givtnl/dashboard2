import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RelationShipService } from 'src/app/account/relationships/services/relationship.service';
import { RelationshipListModel } from 'src/app/account/relationships/models/relation-ship-list.model';

@Injectable({
    providedIn: 'root'
})
export class OnboardingDetailsFetchRelationshipRulesResolver implements Resolve<RelationshipListModel[]> {
    /**
     *
     */
    constructor(private service: RelationShipService, private applicationStateService: ApplicationStateService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): RelationshipListModel[] | Observable<RelationshipListModel[]> | Promise<RelationshipListModel[]> {
        var currentOrganisation = this.applicationStateService.currentTokenModel.OrganisationAdmin
        return this.service.get(currentOrganisation)
    }
}
