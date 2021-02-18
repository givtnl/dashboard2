import { Injectable } from '@angular/core';

import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { CollectGroupDashboardListModel } from '../models/collect-group-side-bar-list.model';
import { EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private storage = sessionStorage;

    public currentCollectGroupChange = new EventEmitter<CollectGroupDashboardListModel>();
    
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
        
    constructor(private backendService: BackendService) { }

    public getCollectGroups(): Observable<CollectGroupDashboardListModel[]> {
        return this.backendService
            .get<CollectGroupDashboardListModel[]>('collectgroupview/collectgroup');
    }
}
