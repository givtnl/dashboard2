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
            obs.next([{ role: "Dashboard user", firstName: "Mike", lastName: "Pattyn", email: "mike@givtapp.net", phone: null }, 
                { role: "Treasurer", firstName: "Maarten", lastName: "Vergouwe", email: "maarten@givtapp.net", phone: "+3249780985" },
                { role: "Marketeer", firstName: "Rowena", lastName: "Veeke", email: "rowena@givtapp.net", phone: "06484874038" },
                { role: "Cleaning lady", firstName: "Sjoerd", lastName: "van Oort", email: "sjoerd@givtapp.net", phone: null}]);
            obs.complete();
        });
        //return this.backendService.get<CollectGroupContactDetailModel[]>(`v2/collectgroups/${collectGroupId}/contacts`);
    }
}