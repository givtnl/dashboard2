import { Injectable } from '@angular/core';

import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { CollectGroupDashboardListModel } from '../models/collect-group-side-bar-list.model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private backendService: BackendService) {}


  public getCollectGroups(): Observable<CollectGroupDashboardListModel[]> {
    return this.backendService
      .get<CollectGroupDashboardListModel[]>('collectgroupview/collectgroup');
  }
}
