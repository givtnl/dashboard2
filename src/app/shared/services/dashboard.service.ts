import { Injectable } from '@angular/core';

import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { CollectGroupDashboardListModel } from '../models/collect-group-side-bar-list.model';
import { EventEmitter } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    public currentCollectGroupChange = new EventEmitter<CollectGroupDashboardListModel>();
    
    #currentCollectGroup: CollectGroupDashboardListModel = null;
    get currentCollectGroup(): CollectGroupDashboardListModel { return this.#currentCollectGroup; }
    set currentCollectGroup(collectGroup: CollectGroupDashboardListModel) {
        this.#currentCollectGroup = collectGroup;
        this.currentCollectGroupChange.emit(this.#currentCollectGroup);
    }
        
    constructor(private backendService: BackendService) { }

    public getCollectGroups(): Observable<CollectGroupDashboardListModel[]> {
        return this.backendService
            .get<CollectGroupDashboardListModel[]>('collectgroupview/collectgroup');
    }
}
