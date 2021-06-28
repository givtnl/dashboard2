import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CollectGroupListModel } from "src/app/collect-groups/models/collect-group-list.model";
import { CollectGroupsService } from "src/app/collect-groups/services/collect-groups.service";
import { DashboardService } from "src/app/shared/services/dashboard.service";
@Injectable({
    providedIn:'root'
})
export class CollectGroupListResolver implements Resolve<CollectGroupListModel[]> {

    constructor(private service: CollectGroupsService, private dashboardService: DashboardService) { }
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CollectGroupListModel[] | Observable<CollectGroupListModel[]> | Promise<CollectGroupListModel[]> {
        return this.service.getAll(this.dashboardService.currentOrganisation.Id);
    }
}