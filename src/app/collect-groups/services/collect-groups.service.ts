import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { CollectGroupListModel } from '../models/collect-group-list.model';
import { CreateCollectGroupCommand } from '../models/create-collect-group.command';
import { CreatedResponseModel } from 'src/app/infrastructure/models/response.model';
import { CreateUserForCollectGroupCommand } from '../models/create-user-for-collect-group.command';
@Injectable({
    providedIn:'root'
})
export class CollectGroupsService {
    constructor(private backendService: BackendService) {}

    getAll(organisationId: string): Observable<CollectGroupListModel[]> {
        return this.backendService.get<CollectGroupListModel[]>(`v2/organisations/${organisationId}/collectgroups`);
    }

    create(organisationId: string, command: CreateCollectGroupCommand): Observable<CreatedResponseModel<string>>{
        return this.backendService.post(`v2/organisations/${organisationId}/collectgroups`, command);
    }

    createUser(collectGroupId:string, command: CreateUserForCollectGroupCommand): Observable<object> {
        return this.backendService.post(`v2/collectgroups/${collectGroupId}/users/register`, command);
    }

    // create qr
    //export qr

    addAccountToCollectGroup(organisationId: string, accountId: number, collectGroupId: string): Observable<object>{
        return this.backendService.post(`v2/organisations/${organisationId}/collectgroups/${collectGroupId}/accounts`,{
            accountId,
            collectGroupId
        });
    }

    
}