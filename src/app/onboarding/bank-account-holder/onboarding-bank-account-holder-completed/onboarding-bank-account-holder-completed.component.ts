import { Component, OnDestroy, OnInit } from '@angular/core';
import { OnboardingGiftAidService } from '../../giftaid/services/onboarding-giftaid.service';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';
import { OrganisationRegistrationStatus } from 'src/app/organisations/enums/organisationregistrationstatus.enum';
import mixpanel from 'mixpanel-browser';

@Component({
    selector: 'app-onboarding-bank-account-holder-completed',
    templateUrl: './onboarding-bank-account-holder-completed.component.html',
    styleUrls: ['../../onboarding.scss', './onboarding-bank-account-holder-completed.component.scss']
})
export class OnboardingBankAccountHolderCompletedComponent implements OnInit, OnDestroy {
    public showGiftAidButton = false;
    private ngUnsubscribe = new Subject<void>();
    constructor(
        private giftAidService: OnboardingGiftAidService,
        private applicationStateService: ApplicationStateService,
        private organisationService: OrganisationsService
    ) { }

    ngOnInit() {
        mixpanel.track("accountHolderAdd:end");
        const currentOrganisationId = this.applicationStateService.currentTokenModel.OrganisationAdmin;
        // if organisation has already giftaid completed because of using it from a parent, this button should not be enabled                
        this.organisationService.getRegistrationStatus(currentOrganisationId)
            .pipe(
                takeUntil(this.ngUnsubscribe),
                map(steps => !steps.some(step => step.OrganisationRegistrationStatus == OrganisationRegistrationStatus.AddGiftAidSettings && step.Finished)),
                switchMap(canEnable => canEnable 
                    ? this.giftAidService.isGiftAidEligble(currentOrganisationId)
                    : of(false)
                ),
                switchMap(canEnable => canEnable
                    // retrieve the organisation and check if the user actually disabled it
                    ? this.organisationService.getById(currentOrganisationId).pipe(map(organisation => organisation.GiftAidEnabled === null))
                    : of(false)
                )).subscribe(enabled => (this.showGiftAidButton = enabled));
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
