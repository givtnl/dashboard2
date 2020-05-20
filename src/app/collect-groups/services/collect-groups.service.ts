import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { CollectGroupListModel } from '../models/collect-group-list.model';
import { CreateCollectGroupCommand } from '../models/create-collect-group.command';
import { CreatedResponseModel } from 'src/app/infrastructure/models/response.model';
import { CreateUserForCollectGroupCommand } from '../models/create-user-for-collect-group.command';
import { HttpParams } from '@angular/common/http';
import { CreatedCollectGroupResponse } from '../models/created-collect-group-response.model';
import { CollectionMediumListModel, CollectionMediumType } from '../models/collection-medium-list.model';
@Injectable({
    providedIn: 'root'
})
export class CollectGroupsService {
    constructor(private backendService: BackendService) { }

    getAll(organisationId: string): Observable<CollectGroupListModel[]> {
        return this.backendService.get<CollectGroupListModel[]>(`v2/organisations/${organisationId}/collectgroups`);
    }

    create(organisationId: string, command: CreateCollectGroupCommand): Observable<CreatedResponseModel<CreatedCollectGroupResponse>> {
        return this.backendService.post(`v2/organisations/${organisationId}/collectgroups`, command);
    }

    createUser(collectGroupId: string, command: CreateUserForCollectGroupCommand): Observable<object> {
        return this.backendService.post(`v2/collectgroups/${collectGroupId}/users/register`, command);
    }
    search(name: string): Observable<CollectGroupListModel[]> {
        return this.backendService.get<CollectGroupListModel[]>(`v2/collectgroups/search/${name.trim()}`);
    }
    getCollectionMediums(organisationId: string, collectGroupId: string): Observable<Array<CollectionMediumListModel>> {
        return this.backendService.get(`v2/organisations/${organisationId}/collectgroups/${collectGroupId}/collectionMediums`);
    }

    addCollectionMedium(organisationId: string, collectGroupId: string, type: CollectionMediumType = CollectionMediumType.QrCodeDefault): Observable<CreatedResponseModel<string>> {
        return this.backendService.post(`v2/organisations/${organisationId}/collectgroups/${collectGroupId}/collectionmediums`, {
            CollectionMediumType: type
        })
    }


    exportCollectionMedium(organisationId: string, collectGroupId: string, collectionMediumId: string, language: string, email: string, organisationName: string, templateName: string, uploadFolder: string): Observable<object> {
        let queryParams = new HttpParams();
        if (email != null) {
            queryParams = queryParams.set('emailAddress', email);
            queryParams = queryParams.set('receiverFirstName', '');
            queryParams = queryParams.set('organisationName', organisationName);
            queryParams = queryParams.set('templateName', templateName);
        }
        
        if (uploadFolder != null)
            queryParams = queryParams.set('uploadFolder', uploadFolder)

        return this.backendService.get(`v2/organisations/${organisationId}/collectgroups/${collectGroupId}/collectionMediums/${collectionMediumId}/export/${language}`, queryParams);
    }

    addAccountToCollectGroup(organisationId: string, accountId: number, collectGroupId: string): Observable<object> {
        return this.backendService.post(`v2/organisations/${organisationId}/collectgroups/${collectGroupId}/accounts`, {
            accountId,
            collectGroupId
        });
    }


}