import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/infrastructure/services/backend.service';
import { Observable } from 'rxjs';
import { OrganisationDetailModel } from '../models/organisation-detail.model';
import { UpdateOrganisationCommand } from '../models/commands/update-organisation.command';
import { CreateOrganisationContactCommand } from '../models/commands/create-organisation-contact.command';

@Injectable({
    providedIn:'root'
})
export class OrganisationsService {
    constructor(private backendService: BackendService) {}

    getById(id: string): Observable<OrganisationDetailModel> {
        return this.backendService.get<OrganisationDetailModel>(`v2/organisations/${id}`);
    }   
    update(id: string, command: UpdateOrganisationCommand): Observable<object> {
        return this.backendService.put(`v2/organisations/${id}`, command);
    } 

    //add contact
    addContact(id: string, command: CreateOrganisationContactCommand): Observable<object> {
        return this.backendService.post(`v2/organisations/${id}/contact`, command);
    }
}