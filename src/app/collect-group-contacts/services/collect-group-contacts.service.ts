import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BackendService } from "src/app/infrastructure/services/backend.service";
import { CollectGroupContactDetailModel } from "../models/collect-group-contact-detail.model";

@Injectable({
    providedIn: 'root'
})
export class CollectGroupContactsService {
    constructor(private backendService: BackendService) { }

    getContacts(collectGroupId: string): Observable<CollectGroupContactDetailModel[]> {
        return new Observable(obs => {
            obs.next([{ role: "Dashboard user", firstName: "Maarten", lastName: "Vergouwe2", email: "maarten@givtapp.net", phone: "+324978098511" }, 
                { role: "Dashboard user", firstName: "Maarten", lastName: "Vergouwe", email: "maarten@givtapp.net", phone: "+32497809851" }]);
            obs.complete();
        });
        //return this.backendService.get<CollectGroupContactDetailModel[]>(`v2/collectgroups/${collectGroupId}/contacts`);
    }
}