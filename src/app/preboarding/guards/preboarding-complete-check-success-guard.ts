import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { Injectable, ɵConsole } from '@angular/core';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { CollectGroupsService } from 'src/app/collect-groups/services/collect-groups.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { CreateUserForCollectGroupCommand } from 'src/app/collect-groups/models/create-user-for-collect-group.command';

@Injectable({
    providedIn: 'root'
})

export class PreboardingCompleteCheckSuccessGuard implements CanActivate {
    constructor(
        private router: Router,
        private organisationService: OrganisationsService,
        private collectGroupService: CollectGroupsService,
        private preboardingStateService: PreboardingStateService,
        private applicationStateService: ApplicationStateService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        try {
            let currentOrganisationId = this.preboardingStateService.organisationDetails.organisationId;
            let toUpdateOrganisation = await this.organisationService.getById(currentOrganisationId).toPromise();
            let additionalInformation = this.preboardingStateService.currentAdditionalInformation;
            let createCollectGroupCommand = this.preboardingStateService.currentCollectGroupDetails;

            let updateOrganisation: UpdateOrganisationCommand = {
                Id: toUpdateOrganisation.Guid,
                Name: toUpdateOrganisation.Name,
                AddressLine1: toUpdateOrganisation.AddressLine1,
                AddressLine2: toUpdateOrganisation.AddressLine2,
                AddressLine3: toUpdateOrganisation.AddressLine3,
                AddressLine4: toUpdateOrganisation.AddressLine4,
                AddressLine5: toUpdateOrganisation.AddressLine5,
                PostalCode: toUpdateOrganisation.PostalCode,
                ParentId: null,
                CharityCommissionNumber: null,
                BackgroundInformation: JSON.stringify(additionalInformation),
                VisitorCount: createCollectGroupCommand.visitorCount,
            }

            // kwil ier de status code checken voe te beslissen ofdak aldan niet een create coll group kan / mag / wil uitvoeren nadat update org is gelukt / niet gelukt
            await this.organisationService.update(currentOrganisationId, updateOrganisation).toPromise();

            let createdCollectGroupId = (await this.collectGroupService.create(currentOrganisationId, createCollectGroupCommand).toPromise()).Result;
            console.log("Created collectgroup id: ", createdCollectGroupId);

            let createUserForCollectGroup: CreateUserForCollectGroupCommand = {
                email: this.preboardingStateService.organisationDetails.emailAddress,
                collectGroupId: createdCollectGroupId,
                organisationId: currentOrganisationId
            }
            let createdCollectGroupUsersResponse = await this.collectGroupService.createUser(createdCollectGroupId, createUserForCollectGroup).toPromise();
            console.log("Created CollectGroup user: ", createdCollectGroupUsersResponse);





            // let createCollectGroup: CreateCollectGroupCommand
            // const createdCollectGroupResponse = await this.collectGroupService.create(null, null).toPromise();




            // const currentCollectGroupDetails = this.preboardingStateService.currentCollectGroupDetails;
            // const organisationContact = this.preboardingStateService.currentOrganisationContact;

            // heb je volgens mij hier ni nodig
            // want de id van je org zit in je stijt state
            // aja toet, de language vo je users te inviten vo de onboarding mail
            //const organisationDetails = this.preboardingStateService.organisationDetails;

            // const createCollectGroupUserCommand = this.preboardingStateService.currentOrganisationAdminContact;


            // let updateOrganisationCommand = {
            //     // je moet zeker de andere properties ook invullen, anders gaaj ze in de api uitblanken

            //     BackgroundInformation: JSON.stringify(additionalInformation),
            //     VisitorCount: currentCollectGroupDetails.visitorCount
            // }



            // // volgens min moej ginder een poar stapn deurloopn, en ton na de volgende stap
            // // vo junder gemak vot testn, begint e ki me jin stap, update gwn e ki die fucking org details

            // // step one update the org details
            // const updatedOrganisationResponse = await this.organisationService.update(null, null).toPromise();
            // // step two create a collect group
            // const createdCollectGroupResponse = await this.collectGroupService.create(null, null).toPromise();

            // // step 2,5 uitnodigen van de admins op de net aangemaakte collectgroup
            // 

            // // step drie create the crm contact

            // // step vier, aanmaken van een qr code

            // // step 5 , exporteren van de aangemaakte qr van stap 4 via email







        } catch (error) {
            alert(error)
            return false;
        }
        return true;
    }
}

