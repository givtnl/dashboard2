import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { OrganisationListModel } from "src/app/organisations/models/organisation-list.model";
import { OrganisationsService } from "src/app/organisations/services/organisations.service";

@Injectable({
    providedIn: 'root'
}) export class OrganisationResolver implements Resolve<OrganisationListModel> {
    constructor(private organisationService: OrganisationsService, private applicationStateService: ApplicationStateService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): OrganisationListModel | Observable<OrganisationListModel> | Promise<OrganisationListModel> {
        return this.organisationService.getAll(this.applicationStateService.currentTokenModel.GUID)
            .pipe(map(organisations => organisations.filter(x => x.Id == this.applicationStateService.currentTokenModel.OrganisationAdmin)[0]));
    }
}