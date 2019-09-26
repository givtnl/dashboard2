import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { CollectGroupListModel } from '../models/collect-group-list.model';

@Injectable({
    providedIn:'root'
})
export class CollectGroupsService {
    constructor(private backendService: BackendService) {}

    getAll(organisationId: string): Observable<CollectGroupListModel[]> {
        return this.backendService.get<CollectGroupListModel[]>(`v2/organisations/${organisationId}/collectgroups`);
    }

    addAccountToCollectGroup(organisationId: string, accountId: number, collectGroupId: string): Observable<object>{
        return this.backendService.post(`v2/organisations/${organisationId}/collectgroups/${collectGroupId}`,{
            accountId,
            collectGroupId
        });
    }

    
}