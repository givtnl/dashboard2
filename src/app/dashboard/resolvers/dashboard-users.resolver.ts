import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ApplicationStateService } from "src/app/infrastructure/services/application-state.service";
import { DashboardUserDetailModel } from "src/app/users/models/dashboard-user-detail.model";
import { DashboardUsersService } from "src/app/users/services/dashboard-users.service";

@Injectable({
    'providedIn':'root'
}) export class DashboardUsersResolver implements Resolve<DashboardUserDetailModel[]> {
    constructor(private dashboardUsersService: DashboardUsersService, private applicationStateService: ApplicationStateService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): DashboardUserDetailModel[] | Observable<DashboardUserDetailModel[]> | Promise<DashboardUserDetailModel[]> {
        return this.dashboardUsersService.getUsers(this.applicationStateService.currentTokenModel.OrganisationAdmin);
    }
}