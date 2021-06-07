import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { OrganisationUserInviteListModel } from "src/app/dashboard-user-registration/models/organisation-user-invite-list.model";
import { OrganisationUserInviteService } from "src/app/dashboard-user-registration/services/organisation-user-invite.service";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";

@Injectable({
    'providedIn':'root'
}) export class DashboardUserInvitesResolver implements Resolve<OrganisationUserInviteListModel[]> {
    constructor(private service: OrganisationUserInviteService, private applicationStateService: ApplicationStateService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): OrganisationUserInviteListModel[] | Observable<OrganisationUserInviteListModel[]> | Promise<OrganisationUserInviteListModel[]> {
        return this.service.getAll(this.applicationStateService.currentTokenModel.OrganisationAdmin);
    }
}