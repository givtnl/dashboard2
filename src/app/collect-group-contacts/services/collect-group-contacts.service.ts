import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BackendService } from "src/app/infrastructure/services/backend.service";
import { CreateCollectGroupContactCommand } from "../commands/create-collect-group-contact.command";
import { CollectGroupContactDetailModel } from "../models/collect-group-contact-detail.model";

@Injectable({
    providedIn: 'root'
})
export class CollectGroupContactsService {
    constructor(private backendService: BackendService) { }

    getContacts(collectGroupId: string): Observable<CollectGroupContactDetailModel[]> {
        return this.backendService.get<CollectGroupContactDetailModel[]>(`v2/collectgroups/${collectGroupId}/contacts`);
    }

    createContact(collectGroupId: string, command: CreateCollectGroupContactCommand): Observable<number> {
        return this.backendService.post<number>(`v2/collectgroups/${collectGroupId}/contacts`, command);
    }
}