import { Component, OnInit } from '@angular/core';
import { OnboardingGiftAidService } from '../../giftaid/services/onboarding-giftaid.service';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApplicationStateService } from 'src/app/infrastructure/services/application-state.service';
import { OrganisationsService } from 'src/app/organisations/services/organisations.service';

@Component({
  selector: 'app-onboarding-bank-account-holder-completed',
  templateUrl: './onboarding-bank-account-holder-completed.component.html',
  styleUrls: ['../../onboarding.module.scss', './onboarding-bank-account-holder-completed.component.scss']
})
export class OnboardingBankAccountHolderCompletedComponent implements OnInit {
  public showGiftAidButton = false;

  constructor(
    private giftAidService: OnboardingGiftAidService,
    private applicationStateService: ApplicationStateService,
    private organisationService: OrganisationsService
  ) {}

  ngOnInit() {
    const currentOrganisationId = this.applicationStateService.currentTokenModel.OrganisationAdmin;
    this.giftAidService
      .isGiftAidEligble(currentOrganisationId)
      // if we could enable gift aid, means we are UK and a valid organisation
      .pipe(
        switchMap(canEnable =>
          canEnable === true
            ? // retrieve the organisation and check if the user actually disabled it
              this.organisationService.getById(currentOrganisationId).pipe(map(organisation => organisation.GiftAidEnabled === null))
            : of(false)
        )
      )
      .subscribe(enabled => (this.showGiftAidButton = enabled));
  }
}
