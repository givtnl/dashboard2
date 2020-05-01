import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { Injectable, ɵConsole } from '@angular/core';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { CollectGroupsService } from 'src/app/collect-groups/services/collect-groups.service';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { CreateUserForCollectGroupCommand } from 'src/app/collect-groups/models/create-user-for-collect-group.command';
import { OnboardingNewUsersService } from 'src/app/onboarding/new-users/services/onboarding-new-users.service';
import { SendUserRegistrationEmailForCollectGroupCommand } from 'src/app/collect-groups/models/send-user-registration-email-for-collect-group.command';
import { forkJoin, concat } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class PreboardingCompleteCheckSuccessGuard implements CanActivate {
    constructor(
        private router: Router,
        private organisationService: OrganisationsService,
        private collectGroupService: CollectGroupsService,
        private preboardingStateService: PreboardingStateService,
        private applicationStateService: ApplicationStateService,
        private onboardingNewUserService: OnboardingNewUsersService
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

            let createdCollectGroupResponse = await this.collectGroupService.create(currentOrganisationId, createCollectGroupCommand).toPromise();

            var toExecuteAdminCalls = [this.preboardingStateService.organisationDetails].map(x => this.onboardingNewUserService.sendRegistrationMail(createdCollectGroupResponse.Result, {
                collectGroupId: createdCollectGroupResponse.Result,
                language: this.preboardingStateService.organisationDetails.language,
                email: x.emailAddress
            }));

            // execute multiple calls, but one at a time
            // await concat(toExecuteAdminCalls).toPromise();
            // execute multiple calls, all at the same time

            await forkJoin(toExecuteAdminCalls).toPromise();

            // create the contact
            await this.organisationService.addContact(currentOrganisationId, this.preboardingStateService.currentOrganisationContact).toPromise();

            // create the qr code
            // var createdQrCodeResponse = await this.collectGroupService.addCollectionMedium(createdCollectGroupResponse.Result).toPromise();

            //export the qr code via mail
            // await this.collectGroupService.exportCollectionMedium(createdCollectGroupResponse.Result,
            //     createdQrCodeResponse.Result,
            //     this.preboardingStateService.organisationDetails.language,
            //     this.preboardingStateService.organisationDetails.emailAddress
            // ).toPromise();
            
        } catch (error) {
            alert(error)
            return false;
        }
        return true;
    }
}

