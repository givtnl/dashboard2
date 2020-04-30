import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { Injectable } from '@angular/core';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { CollectGroupsService } from 'src/app/collect-groups/services/collect-groups.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';

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
            const currentOrganisationId = this.applicationStateService.currentTokenModel.OrganisationAdmin;

            const additionalInformation = this.preboardingStateService.currentAdditionalInformation;
            const currentCollectGroupDetails = this.preboardingStateService.currentCollectGroupDetails;
            const organisationContact = this.preboardingStateService.currentOrganisationContact;

            // heb je volgens mij hier ni nodig
            // want de id van je org zit in je stijt state
            // aja toet, de language vo je users te inviten vo de onboarding mail
            //const organisationDetails = this.preboardingStateService.organisationDetails;

            const createCollectGroupUserCommand = this.preboardingStateService.currentOrganisationAdminContact;
            let createCollectGroupCommand = this.preboardingStateService.currentCollectGroupDetails;

            let updateOrganisationCommand = {
                // je moet zeker de andere properties ook invullen, anders gaaj ze in de api uitblanken

                BackgroundInformation: JSON.stringify(additionalInformation),
                VisitorCount: currentCollectGroupDetails.visitorCount
            }

            const toUpdateOrganisation = await this.organisationService.getById(currentOrganisationId).toPromise();
            console.log(toUpdateOrganisation);

            // // volgens min moej ginder een poar stapn deurloopn, en ton na de volgende stap
            // // vo junder gemak vot testn, begint e ki me jin stap, update gwn e ki die fucking org details

            // // step one update the org details
            // const updatedOrganisationResponse = await this.organisationService.update(null, null).toPromise();
            // // step two create a collect group
            // const createdCollectGroupResponse = await this.collectGroupService.create(null, null).toPromise();

            // // step 2,5 uitnodigen van de admins op de net aangemaakte collectgroup
            // const createdCollectGroupUsersResponse = await this.collectGroupService.createUser(createdCollectGroupResponse.Result, createCollectGroupUserCommand).toPromise();

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

