import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PreboardingStateService } from '../services/preboarding-state.service';
import { Injectable } from '@angular/core';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { CollectGroupsService } from 'src/app/collect-groups/services/collect-groups.service';
import { UpdateOrganisationCommand } from 'src/app/organisations/models/commands/update-organisation.command';
import { OnboardingNewUsersService } from 'src/app/onboarding/new-users/services/onboarding-new-users.service';
import { forkJoin } from 'rxjs';
import { OrganisationType } from '../models/organisation-type.enum';
import { PreboardingFormattingService } from '../services/preboarding-formatting.service';
import { OrganisationRegistrationProgress } from '../../organisations/models/organisaition-registration-progress';
import { CollectionMediumType } from 'src/app/collect-groups/models/collection-medium-list.model';

@Injectable({
    providedIn: 'root'
})

export class PreboardingCompleteCheckSuccessGuard implements CanActivate {
    constructor(
        private formattingService: PreboardingFormattingService,
        private organisationService: OrganisationsService,
        private collectGroupService: CollectGroupsService,
        private preboardingStateService: PreboardingStateService,
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
                CharityCommissionNumber: null
            }

            // kwil ier de status code checken voe te beslissen ofdak aldan niet een create coll group kan / mag / wil uitvoeren nadat update org is gelukt / niet gelukt
            await this.organisationService.update(currentOrganisationId, updateOrganisation).toPromise();

            let currentOrganisationCollectGroups = await this.collectGroupService.getAll(currentOrganisationId).toPromise();
            let createdCollectGroupResponse = currentOrganisationCollectGroups && currentOrganisationCollectGroups.length > 0 ?
                {
                    Result: {
                        Id: currentOrganisationCollectGroups[0].Id,
                        Namespace: currentOrganisationCollectGroups[0].Namespace
                    }
                } :
                await this.collectGroupService.create(currentOrganisationId, createCollectGroupCommand).toPromise();

            var toExecuteAdminCalls = this.preboardingStateService.currentOrganisationAdminContact.map(x =>
                this.onboardingNewUserService.sendRegistrationMail(createdCollectGroupResponse.Result.Id, {
                    collectGroupId: createdCollectGroupResponse.Result.Id,
                    language: x.language,
                    email: x.email
                })
            );

            // execute multiple calls, all at the same time
            await forkJoin(toExecuteAdminCalls).toPromise();

            // create the note
            await this.organisationService.addNote(currentOrganisationId, 'Preboarding completed',
                `${this.formattingService.formatContact(this.preboardingStateService.currentOrganisationContact)}${this.formattingService.formatInfo(additionalInformation)}`).toPromise();

            // create the qr code
            var currentQrCodes = await this.collectGroupService.getCollectionMediums(currentOrganisationId, createdCollectGroupResponse.Result.Id).toPromise();
            var createdQrCodeResponse =
                currentQrCodes && currentQrCodes.length > 0 ?
                    {
                        Result: currentQrCodes[0].MediumId
                    } :
                    await this.collectGroupService.addCollectionMedium(currentOrganisationId, createdCollectGroupResponse.Result.Id).toPromise();

            // build template name
            var templateName = `PreboardCompleted${OrganisationType[this.preboardingStateService.organisationDetails.type]}`
            // export the qr code via mail
            await this.collectGroupService.exportCollectionMedium(
                currentOrganisationId,
                createdCollectGroupResponse.Result.Id,
                createdQrCodeResponse.Result,
                this.preboardingStateService.organisationDetails.language,
                this.preboardingStateService.organisationDetails.emailAddress,
                this.preboardingStateService.organisationDetails.organisationName,
                templateName,
                null
            ).toPromise();

            if (currentQrCodes.length == 0) {
                var toCreateQrCodes = [CollectionMediumType.QrCodeWebOnly, CollectionMediumType.QrCodeKDGM].map(qrType =>
                    // generate and upload the qr code for the wog (c6 and ce)
                    this.collectGroupService.addCollectionMedium(currentOrganisationId, createdCollectGroupResponse.Result.Id, qrType)
                        .toPromise()
                        .then((response) => {
                            this.collectGroupService.exportCollectionMedium(
                                currentOrganisationId,
                                createdCollectGroupResponse.Result.Id,
                                response.Result,
                                this.preboardingStateService.organisationDetails.language,
                                null,
                                null,
                                null,
                                "cdn/qr"
                            );                                                            
                        })
                )
                await forkJoin(toCreateQrCodes).toPromise();
            }

            await this.organisationService.changeProgress(currentOrganisationId, OrganisationRegistrationProgress.Preboarded).toPromise();
        } catch (error) {
            return false;
        }
        return true;
    }
}

