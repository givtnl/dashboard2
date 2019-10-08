import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { OrganisationDetailModel } from '../models/organisation-detail.model';

@Injectable({
    providedIn:'root'
})
export class OrganisationsService {
    constructor(private backendService: BackendService) {}

    getById(id: string): Observable<OrganisationDetailModel> {
        return this.backendService.get<OrganisationDetailModel>(`v2/organisations/${id}`);
    }    
}