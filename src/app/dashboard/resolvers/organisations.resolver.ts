import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { OrganisationListModel } from "src/app/organisations/models/organisation-list.model";
import { OrganisationsService } from "src/app/organisations/services/organisations.service";

@Injectable({
    providedIn: 'root'
}) export class OrganisationsResolver implements Resolve<OrganisationListModel[]> {
    constructor(private organisationService: OrganisationsService, private applicationStateService: ApplicationStateService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): OrganisationListModel[] | Observable<OrganisationListModel[]> | Promise<OrganisationListModel[]> {
        return this.organisationService.getAll(this.applicationStateService.currentTokenModel.GUID);
    }
}