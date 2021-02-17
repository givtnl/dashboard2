import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from "@angular/core";
import { CollectGroupContactDetailModel } from 'src/app/collect-group-contacts/models/collect-group-contact-detail.model';
import { Observable } from 'rxjs';
import { CollectGroupContactsService } from 'src/app/collect-group-contacts/services/collect-group-contacts.service';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Injectable({
    providedIn: 'root'
})
export class CollectGroupContactsResolver implements Resolve<CollectGroupContactDetailModel[]> {
    
    constructor(private collectGroupContactsService: CollectGroupContactsService, private dashboardService: DashboardService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CollectGroupContactDetailModel[] | Observable<CollectGroupContactDetailModel[]> | Promise<CollectGroupContactDetailModel[]> {
        return this.collectGroupContactsService.getContacts(this.dashboardService.currentCollectGroup.GUID);
    }
}