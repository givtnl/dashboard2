import { Injectable } from "@angular/core";
import { CreateCollectGroupContactCommand } from "src/app/collect-group-contacts/commands/create-collect-group-contact.command";

@Injectable({
    providedIn: 'root'
})
export class ContactRegistrationStateService {
    private storage = sessionStorage;

    public get currentContactRegistrationInformation(): CreateCollectGroupContactCommand {
        const key = 'ContactRegistrationStateService.currentContactRegistrationInformation';
        const serializedRequest = JSON.parse(this.storage.getItem(key));
        return serializedRequest || {
            role: "",
            firstName: "",
            lastName: "",
            email: "",
            telephone: null
        };
    }

    public set currentContactRegistrationInformation(value: CreateCollectGroupContactCommand) {
        const key = 'ContactRegistrationStateService.currentContactRegistrationInformation';
        this.storage.setItem(key, JSON.stringify(value));
    }
}