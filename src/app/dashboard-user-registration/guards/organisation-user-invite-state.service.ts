import { Injectable } from "@angular/core";
import { CreateOrganisationUserInviteCommand } from "../models/create-organisation-user-invite-command.model";

@Injectable({
    providedIn: 'root'
})
export class OrganisationUserInviteStateService {
    private storage = sessionStorage;

    public clear():void {
        this.storage.removeItem('OrganisationUserInvitesService.currentOrganisationUserInvite');
    }
    public get currentOrganisationUserInvite(): CreateOrganisationUserInviteCommand {
        const key = 'OrganisationUserInvitesService.currentOrganisationUserInvite';
        return JSON.parse(this.storage.getItem(key));
    }

    public set currentOrganisationUserInvite(value: CreateOrganisationUserInviteCommand) {
        const key = 'OrganisationUserInvitesService.currentOrganisationUserInvite';
        this.storage.setItem(key, JSON.stringify(value));
    }
}