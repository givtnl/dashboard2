import { Injectable } from "@angular/core";
import { CreateContactCommand } from "src/app/contacts/commands/create-contact.command";

@Injectable({
    providedIn: 'root'
})
export class ContactRegistrationStateService {
    private storage = sessionStorage;

    public get currentContactRegistrationInformation(): CreateContactCommand {
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

    public set currentContactRegistrationInformation(value: CreateContactCommand) {
        const key = 'ContactRegistrationStateService.currentContactRegistrationInformation';
        this.storage.setItem(key, JSON.stringify(value));
    }
}