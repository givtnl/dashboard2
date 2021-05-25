import { Injectable } from '@angular/core';

import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { CollectGroupDashboardListModel } from '../models/collect-group-side-bar-list.model';
import { EventEmitter } from '@angular/core';
import { CollectGroupsService } from 'src/app/collect-groups/services/collect-groups.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { map } from 'rxjs/operators';
import { CollectGroupType } from '../enums/collect-group-type.enum';
import { OrganisationListModel } from 'src/app/organisations/models/organisation-list.model';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private storage = sessionStorage;

    public currentCollectGroupChange = new EventEmitter<CollectGroupDashboardListModel>();
    public currentOrganisationChange = new EventEmitter<OrganisationListModel>();

    get currentOrganisation(): OrganisationListModel {
        const key = 'DashboardService.CurrentOrganisation';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest;
    }

    set currentOrganisation(organisation: OrganisationListModel) {
        const key = 'DashboardService.CurrentOrganisation';
        this.storage.setItem(key, JSON.stringify(organisation));
        this.currentOrganisationChange.emit(organisation);
    }

    get currentCollectGroup(): CollectGroupDashboardListModel {
        const key = 'DashboardService.CurrentCollectGroup';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest;
    }
    set currentCollectGroup(collectGroup: CollectGroupDashboardListModel) {
        const key = 'DashboardService.CurrentCollectGroup';
        this.storage.setItem(key, JSON.stringify(collectGroup));
        this.currentCollectGroupChange.emit(collectGroup);
    }
        
    constructor(private backendService: BackendService,
        private collectGroupsService: CollectGroupsService,
        private applicationStateService: ApplicationStateService
        ) { }

    public getCollectGroups(): Observable<CollectGroupDashboardListModel[]> {
        return this.collectGroupsService.getAll(this.applicationStateService.currentTokenModel.OrganisationAdmin)
            .pipe(map(x => x.map(y => {
                const a: CollectGroupDashboardListModel = {
                    GUID: y.Id,
                    CollectGroupType: y.Type,
                    CollectGroupTypeDescription: CollectGroupType[y.Type],
                    Name: y.Name
                };
                return a;
            })));
    }
}
